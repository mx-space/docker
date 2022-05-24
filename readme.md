# MSpace Docker

使用之前你需要安装 Node, Docker(compose) zx

你需要先把域名解析到服务器

```bash
# install docker
curl -fsSL https://get.docker.com | bash -s docker
docker -v
docker compose version
```

zx 可以通过 npm 安装

```
zx ./build.mjs
```

参考输入:

```
Your domain name is: innei.ren
Your email is: tukon@gmail.com
```

## 更新

```
zx ./update.mjs
```

## 从零开始的部署过程

假设现在你有一台 Ubuntu 的服务器。还没有安装任何环境。并且你已经将域名解析到了服务器。复制以下脚本运行。

```bash
sudo apt update && sudo apt install git curl vim wget -y
curl -fsSL https://get.docker.com | bash -s docker
# 国内加速
# curl -sSL https://get.daocloud.io/docker | sh


#下载 docker-compose
wget https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64
#备用 wget https://download.fastgit.org/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64
#新建文件夹（非必须），可能需要
sudo mkdir -p /usr/local/lib/docker/cli-plugins/
# 复制到指定位置
sudo cp ./docker-compose-linux-x86_64  /usr/local/lib/docker/cli-plugins/docker-compose
# 赋予执行权限
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
export N_PREFIX=$HOME/.n
export PATH=$N_PREFIX/bin:$PATH
bash n lts
export N_PRESERVE_NPM=1
npm i -g npm@latest
npm i -g yarn zx pnpm n

mkdir -p mx
cd mx
git clone https://github.com/mx-space/docker --depth=1
cd docker
zx ./build.js
```

CentOS Install Docker


```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
yum list docker-ce --showduplicates | sort -r
sudo systemctl start docker
```