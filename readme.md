# MSpace Docker

使用之前你需要安装 Node, Docker, Docker Compose, zx

你需要先把域名解析到服务器

```bash
# install docker
curl -fsSL https://get.docker.com | bash -s docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

zx 可以通过 npm 安装

```
zx ./build.js
```

参考输入:

```
Your domain name is: innei.ren
Your email is: tukon@gmail.com
```

## 从零开始的部署过程

假设现在你有一台 Ubuntu 的服务器。还没有安装任何环境。并且你已经将域名解析到了服务器。复制以下脚本运行。

```bash
sudo apt update && sudo apt install git curl vim wget -y
curl -fsSL https://get.docker.com | bash -s docker
# 国内加速
# curl -sSL https://get.daocloud.io/docker | sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 国内加速
# sudo curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
bash n lts
source ~/.bashrc
npm i -g yarn zx pnpm

mkdir -p mx
cd mx
git clone https://github.com/mx-space/docker --depth=1
cd docker
zx ./build.js
```
