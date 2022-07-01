#!env zx
// @ts-check
import 'zx/globals'

!(async () => {
  await $`cd kami && git pull &&  git fetch --tags && latestTag=$(git describe --tags \`git rev-list --tags --max-count=1\`) && git checkout $latestTag`
  await $`docker compose pull`
  let args = []
  if (fs.pathExistsSync(path.join(__dirname, './no-caddy'))) {
    args.push('-f', 'docker-compose.no-caddy.yml')
  }
  await $`docker compose ${args.join(' ')} build`
  await $`docker compose ${args.join(' ')} up -d`
})()
