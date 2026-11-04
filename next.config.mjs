/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  output: 'export',
  images: {
    loader: 'custom',
    deviceSizes: [360, 480, 640, 960, 1440],
    imageSizes: [],
  },
  distDir: 'dist'
};

export default nextConfig;
