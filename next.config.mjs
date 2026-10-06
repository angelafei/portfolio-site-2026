/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  output: 'export',
  images: { unoptimized: true },
  distDir: 'dist'
};

export default nextConfig;
