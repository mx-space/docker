#!env sh
set -e
preCheck() {
  git version || {
    echo 'git 未安装'
    exit -1
  }
  docker -v || {
    echo 'docker 未安装'
    exit -1
  }
  docker compose version || {
    echo 'Docker 版本过低，需要支持 compose 的 Docker'
    exit -1
  }
  git lfs version || {
    echo 'git lfs 未安装'
    exit -1
  }
  uuidgen 1>/dev/null || {
    echo 'uuidgen 未安装'
    exit -1
  }
}

# main

if [ -e "${PWD}/Caddyfile" ] || [ -e "${PWD}/.env" ]; then
  read -p "已经构建过了，是否重新构建，(需要更新请执行 update.sh) [y/N]" choice
  if [ "$choice" = "y" ]; then
    rm -rf .env
    rm -rf Caddyfile
  elif [ "$choice" = "n" ]; then
    exit 0
  elif [ "$choice" = "N" ]; then
    exit 0
  elif [ "$choice" = "" ]; then
    exit 0
  else
    echo "选项错误"
    exit -1
  fi
fi

preCheck

read -p "你的域名为：（需要提前绑定）" domain

if [ -z "$domain" ]; then
  echo "域名不能为空"
  exit 1
fi
read -p "你的邮箱为: (此步留空，则不部署 Caddy 服务) " email
caddy2=true
if [ "$email" ]; then
  read -p "是否部署 Caddy 2.0？ (Y/n)" caddy2
  case $caddy2 in
  y)
    caddy2=true
    ;;
  n)
    caddy2=false
    ;;
  *)
    caddy2=true
    ;;
  esac

fi

setupCaddy2=$email && $caddy2

if [ "x$setupCaddy2" != "x" ]; then
  caddy=$(cat ./Caddyfile.example)
  rm -f Caddyfile
  echo "$caddy" | sed -e "s/---------DOMAIN------------/$domain/g" | sed -e "s/--------EMAIL------------/$email/g" >Caddyfile
fi

randomString=$(uuidgen | tr -d '-')

cp .env.example .env
echo BASE_URL=https://${domain} >>.env
echo JWT_SECRET=${randomString} >>.env
echo ALLOWED_ORIGINS=${domain} >>.env
rm -rf kami
git clone https://github.com/mx-space/kami --depth=1

cd kami
git fetch --tags
latestTagHash=$(git rev-list --tags --max-count=1)
latestTag=$(git describe --tags $latestTagHash)
git checkout $latestTag
cd ..

if [ "x$setupCaddy2" != "x" ]; then
  docker compose build
  docker compose up -d
else
  docker compose -f docker-compose.no-caddy.yml build
  docker compose -f docker-compose.no-caddy.yml up -d
  touch ./no-caddy
fi
