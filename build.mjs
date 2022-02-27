#!/usr/bin/env zx

// @ts-check
import 'zx/globals'
const { readFileSync, writeFileSync } = fs

async function main() {
  if (
    fs.pathExistsSync(path.join(__dirname, 'Caddyfile')) ||
    fs.pathExistsSync(path.join(__dirname, '.env'))
  ) {
    const choice =
      (await question(
        '已经构建过了，是否重新构建，(需要更新请执行 update.mjs) [y/n].',
        {
          choices: ['y', 'n'],
        },
      )) === 'y'

    if (choice) {
      await $`rm -rf .env`
      await $`rm -rf Caddyfile`
    } else {
      return
    }
  }
  // pre-check

  await $`git version`
  await $`docker -v`

  try {
    await $`docker compose version`
  } catch {
    console.error('Docker 版本过低，需要支持 compose 的 Docker')
    process.exit(-1)
  }

  const domain = await question('你的域名为：（需要提前绑定）')

  if (!domain) {
    throw new Error('域名不能为空')
  }
  const email = await question('你的邮箱为: (此步留空，则不部署 Caddy 服务) ')
  let caddy2 = true
  if (email) {
    caddy2 =
      (await question('是否部署 Caddy 2.0？ (y/n)', {
        choices: ['y', 'n'],
      })) === 'y'
  }
  const setupCaddy2 = email && caddy2
  if (!setupCaddy2) {
  } else {
    const caddy = readFileSync('./Caddyfile.example', { encoding: 'utf8' })
    await $`rm -f Caddyfile`
    writeFileSync(
      './Caddyfile',
      caddy
        .replace('---------DOMAIN------------', domain)
        .replace('--------EMAIL------------', email),
      {
        encoding: 'utf-8',
      },
    )
  }

  await $`cp .env.example .env`
  await $`echo BASE_URL=https://${domain} >> .env`
  await $`echo JWT_SECRET=${Math.random()
    .toString(16)
    .slice(2, 2 + 10)} >> .env`
  await $`rm -rf kami`
  await $`git clone https://github.com/mx-space/kami --depth=1`

  if (setupCaddy2) {
    await $`docker compose build`
    await $`docker compose up -d`
  } else {
    await $`docker compose -f docker-compose.no-caddy.yml build`
    await $`docker compose -f docker-compose.no-caddy.yml up -d`
    fs.createFileSync('./no-caddy')
  }
}

;(async () => {
  try {
    await main()
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(-1)
  }
})()
