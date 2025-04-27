/** @type {import('next').NextConfig} */
const nextConfig = {
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