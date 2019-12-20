const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
module.exports = withCSS(withImages())

exports.default = {
  env: {
    API_URL: process.env.API_URL,
  }
};