const config = require('config')
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  env: config,
  reactStrictMode: true,
  basePath: config.basePath
})
