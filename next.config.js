const nextTranslate = require('next-translate')

const config = {
  demoMode: true,
  basePath: '/dev',
  authURL: 'http://localhost:3001',
  apiURL: 'http://localhost:3001',
  finishI18n: false
}

module.exports = nextTranslate({
  env: config,
  reactStrictMode: true,
  basePath: config.basePath
})
