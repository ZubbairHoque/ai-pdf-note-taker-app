/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config
  
  // Add this for proper build caching on Vercel
  generateBuildId: async () => {
    // This could be a git hash or timestamp
    return process.env.BUILD_ID || new Date().getTime().toString()
  },
}

module.exports = nextConfig