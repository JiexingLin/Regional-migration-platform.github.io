/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['python-shell']
  },
  webpack: (config, { isServer }) => {
    // 优化 bundle 大小
    if (isServer) {
      config.externals.push('canvas', 'jsdom')
    }
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/migration/:path*',
        destination: 'http://localhost:8000/api/migration/:path*' // FastAPI服务器
      }
    ]
  }
}

module.exports = nextConfig 