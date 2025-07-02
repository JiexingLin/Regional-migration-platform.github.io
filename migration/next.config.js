/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['python-shell'],
  webpack: (config, { isServer }) => {
    // 优化 bundle 大小
    if (isServer) {
      config.externals.push('canvas', 'jsdom')
    }
    return config
  },
  // 移除了本地开发的重写规则，在生产环境中使用 Vercel 的 API 路由
}

module.exports = nextConfig 