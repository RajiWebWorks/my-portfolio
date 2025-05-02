// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-portfolio-vqy5.onrender.com',
        port: '',
        pathname: '/**',
      },
      // Add a hostname for localhost if testing locally
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      // Add your Vercel domain as well for self-referencing images
      {
        protocol: 'https',
        hostname: 'my-portfolio-five-nu-40.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
    // Only use unoptimized in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Improved rewrites with better fallback handling
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/:path*`,
          },
        ]
      : [
          // In production, redirect API calls to your Render backend
          {
            source: '/api/:path*',
            destination: 'https://my-portfolio-vqy5.onrender.com/api/:path*',
          },
        ];
  },
  
  // Add this to help with relative paths in production
  basePath: '',
  
  // Recommended for performance
  swcMinify: true,
  
  // Handle trailing slashes consistently
  trailingSlash: false,
};

export default nextConfig;