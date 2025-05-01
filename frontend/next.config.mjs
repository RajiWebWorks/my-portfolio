/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This disables SSR and generates static HTML
  images: {
    unoptimized: true,  // This is required for 'output: export' to work with Next.js Image
  },
}

module.exports = nextConfig
