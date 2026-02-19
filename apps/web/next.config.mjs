/** @type {import('next').NextConfig} */
import "dotenv/config";
const SUPABASE_HOST = new URL(process.env.NEXT_PUBLIC_SUPABASE_CDN_BASE).hostname;

const nextConfig = {
  // output: "standalone",
  reactStrictMode: false,
  transpilePackages: ["app"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 정적 파일 처리 개선
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  trailingSlash: false,
  images: {
    unoptimized: false, // 최적화 활성화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [SUPABASE_HOST],
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOST,
        pathname: "/storage/v1/object/public/assets-addeep/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://www.youtube.com https://youtube.com",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(woff|woff2|eot|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable, no-transform",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Accept-Ranges",
            value: "none",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "addeep.co.kr" }],
        destination: "https://addeep.ai/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.addeep.co.kr" }],
        destination: "https://addeep.ai/:path*",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  {
                    name: "convertColors",
                    params: {
                      currentColor: true,
                    },
                  },
                  "removeDimensions",
                ],
              },
              typescript: true,
              dimensions: false,
              ref: true,
              svgProps: {
                width: 24,
                height: 24,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "static/media",
            publicPath: "/_next/static/media",
            name: "[name].[hash].[ext]",
          },
        },
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
