#!env zx
// @ts-check
import 'zx/globals'

!(async () => {
  await $`cd kami && git pull`
  await $`docker-compose pull`
  await $`docker-compose build`
  await $`docker-compose up --detach`
})()
