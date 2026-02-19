/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // Vercel 배포를 위해 주석 처리 (Docker 배포 시에만 필요)
  env: {
    port: "3001",
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 이미지 업로드를 위해 10MB로 증가
    },
  },
};

export default nextConfig;
