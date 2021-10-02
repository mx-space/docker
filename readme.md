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