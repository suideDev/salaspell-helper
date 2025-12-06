/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/salaspell-helper' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/salaspell-helper' : '',
}

module.exports = nextConfig

