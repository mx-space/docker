#!env zx
try {
  require('zx/globals')
} catch {}

!(async () => {
  await $`cd kami && git pull`
  await $`docker-compose pull`
  await $`docker-compose build`
  await $`docker-compose up --detach`
})()
