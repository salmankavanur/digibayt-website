/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Add custom resolver for punycode
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        punycode: false,  // Disable the Node.js punycode module
      },
    };
    
    return config;
  },
}

export default nextConfig
