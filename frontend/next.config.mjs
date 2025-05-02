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
    ],
    // Add unoptimized option for specific cases
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Add this to handle CORS in development
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
          },
        ]
      : [];
  },
};

export default nextConfig;