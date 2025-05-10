/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Remove 'unoptimized: true' to enable optimization
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"], // Add your external domains here
  },
};

export default nextConfig;
