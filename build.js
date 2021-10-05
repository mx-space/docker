#!/usr/bin/env zx
try {
  require('zx/globals')
} catch {}
const { readFileSync, writeFileSync } = require('fs')

async function main() {
  // pre-check

  await $`git version`
  await $`docker -v`
  await $`docker-compose -v`

  const domain = await question('Your domain name is: ')

  if (!domain) {
    throw new Error('domain can not be empty.')
  }
  const email = await question('Your email is: ')
  if (!email) {
    throw new Error('email can not be empty.')
  }

  const caddy = readFileSync('./Caddyfile.example', { encoding: 'utf8' })
  await $`rm -f Caddyfile`
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
  await $`echo JWT_SECRET=${Math.random()
    .toString(16)
    .slice(2, 2 + 10)} >> .env`
  await $`rm -rf kami`
  try {
    await $`git clone https://github.com/mx-space/kami --depth=1`
  } catch {
    await nothrow($`cd kami && git pull`)
  }
  await $`docker-compose build`
  await $`docker-compose up -d`
}

;(async () => {
  try {
    await main()
  } catch (e) {
    console.log(chalk.red(e.message))
  }
})()
