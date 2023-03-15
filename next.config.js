/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      { protocol: "https", hostname: "img1.daumcdn.net" },
      {
        protocol: "http",
        hostname: "ec2-3-34-75-45.ap-northeast-2.compute.amazonaws.com",
        port: "8080",
      },
      { protocol: "http", hostname: "k.kakaocdn.net" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "bssm.kro.kr" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "velog.velcdn.com" },
      { protocol: "https", hostname: "auth.bssm.kro.kr" },
      { protocol: "https", hostname: "api.project.bssm.io" },
    ],
  },
};

module.exports = nextConfig;
