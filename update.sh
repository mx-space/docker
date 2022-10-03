#!env sh
cd kami
git fetch --all --tags --prune
latestTagHash=$(git rev-list --tags --max-count=1)
latestTag=$(git describe --tags $latestTagHash)
echo "Latest tag: $latestTag, checkout"
git checkout $latestTag
cd ..

docker compose pull
if [ -f "./no-caddy" ]; then
  echo "Build docker without Caddy2"
  docker compose -f docker-compose.no-caddy.yml build
  docker compose -f docker-compose.no-caddy.yml up -d
else
  echo "Build docker with Caddy2 (HTTP host)"
  docker compose build
  docker compose up -d
fi
