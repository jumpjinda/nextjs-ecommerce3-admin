/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.dummyjson.com"],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
