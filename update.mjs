#!env zx
// @ts-check
import 'zx/globals'

!(async () => {
  await $`cd kami && git pull`
  await $`docker compose pull`
  let args = []
  if (fs.pathExistsSync(path.join(__dirname, './no-caddy'))) {
    args.push('-f docker-compose.no-caddy.yml')
  }
  await $`docker compose ${args.join(' ')} build`
  await $`docker compose ${args.join(' ')} up -d`
})()
