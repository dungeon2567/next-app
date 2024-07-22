const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");



module.exports = async (phase) => {
  const nextConfig = {};

  if (phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      // Note: This is only an example. If you use Pages Router,
      // use something else that works, such as "service-worker/index.ts".
      swSrc: "app/sw.ts",
      swDest: "public/sw.js",
    });
    return withSerwist(nextConfig);
  }
  else
  {
    return  withBundleAnalyzer({
      output: 'export',
      reactStrictMode: false,
      experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      },
    });
  }

  return nextConfig;
};
