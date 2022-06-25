#!env bash
function install_node() {
  curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
  # 如果无法访问 Github raw 的话就执行下面这条命令
  # curl -L https://github.do/https://raw.githubusercontent.com/tj/n/master/bin/n -o n
  export N_PREFIX=$HOME/.n
  export PATH=$N_PREFIX/bin:$PATH
  # export N_NODE_MIRROR=https://npmmirror.com/mirrors/node  #如果官方源下载慢的话可以执行这条换国内源
  bash n lts
  export N_PRESERVE_NPM=1
  npm i -g npm@latest
  npm i -g yarn zx pnpm n

}

if command -v node &>/dev/null; then
  echo "node is install"
else
  install_node
fi

if command -v npm &>/dev/null; then
  echo "npm is install"
fi

if command -v zx &>/dev/null; then
  echo "zx is install"
  exit 0
else
  npm i -g zx
fi
