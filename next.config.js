/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
      },
      { protocol: "https", hostname: "img1.daumcdn.net", port: "" },
    ],
  },
};

module.exports = nextConfig;
