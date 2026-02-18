/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration...
  reactCompiler: true,

  // Add this section to explicitly disable Turbopack
  experimental: {
    webpackBuildWorker: true,
  },
  // Turbopack is on by default in Next.js 14, so we don't need to explicitly enable/disable it
  // in the dev script. This config ensures Webpack is used.
};

export default nextConfig;
