# MSpace Docker

使用之前你需要安装 Docker (with compose)

你需要先把域名解析到服务器

```bash
# install docker
curl -fsSL https://get.docker.com | bash -s docker
docker -v
docker compose version
bash ./build.sh
```

参考输入:

```
Your domain name is: innei.ren
Your email is: tukon@gmail.com
```

## 更新

```
bash ./update.sh
```

## 从零开始的部署过程

假设现在你有一台 Ubuntu 的服务器。还没有安装任何环境。并且你已经将域名解析到了服务器。复制以下脚本运行。

```bash
sudo apt update && sudo apt install git curl vim wget -y
curl -fsSL https://get.docker.com | bash -s docker

mkdir -p mx
cd mx
git clone https://github.com/mx-space/docker --depth=1
cd docker
bash ./build.sh
```

CentOS Install Docker

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

## 如果你选择 Nginx...

如果选择 Nginx 作为服务器。这里也提供一份反向代理的配置文件。

在 [nginx.conf](./configs/nginx.conf) 查看。
