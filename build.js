#!/usr/bin/env zx

const { readFileSync, writeFileSync } = require('fs')
const { $, question } = require('zx')

async function main() {
  const domain = await question('Your domain name is: ')
  const email = await question('Your email is: ')

  const caddy = readFileSync('./Caddyfile', { encoding: 'utf8' })

  writeFileSync(
    './Caddyfile',
    caddy
      .replace(/dev\.shizuri\.net/g, domain)
      .replace('tukon@gmail.com', email),
    {
      encoding: 'utf-8',
    },
  )
  await $`rm -rf .env`
  await $`cp .env.example .env`
  await $`echo BASE_URL=https://${domain} >> .env`
  await $`rm -rf kami`
  await $`git clone https://github.com/mx-space/kami --depth=1`
  await $`docker-compose build`
  await $`docker-compose up -d`
}

main()
