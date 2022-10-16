/** @type {import('next').NextConfig} */
require('dotenv/config')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  env: {
    SERVER_HOST: process.env.SERVER_HOST
  }
}

module.exports = nextConfig
