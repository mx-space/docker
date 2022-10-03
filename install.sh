set -e
echo "Install in workspace ~/mx"
cd
mkdir -p mx
cd mx

echo "Delete old files"
[ -f ".env.example" ] && rm -f .env.example
[ -f "Caddyfile.example" ] && rm -f Caddyfile.example
[ -f "build.sh" ] && rm -f build.sh
[ -f "update.sh" ] && rm -f update.sh
[ -f "docker-compose.yml"] && rm -f docker-compose.yml
[ -f "docker-compose.no-caddy.yml"] && rm -f docker-compose.no-caddy.yml

echo "Download nessary scripts and config..."
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/.env.example
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/Caddyfile.example
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/docker-compose.yml
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/docker-compose.no-caddy.yml
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/build.sh
wget https://fastly.jsdelivr.net/gh/mx-space/docker@master/update.sh

echo "Run build.sh"
bash build.sh
