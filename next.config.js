/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    // customized .....................................................

    webpack(config, { isServer, dev }) {
        config.ignoreWarnings = [
            (warning) => warning.message.includes("__barrel_optimize__"), // Suppress specific warning logs
        ];
        // Enable caching for faster rebuilds
        config.cache = true;

        // Reduce the number of workers for smaller projects
        if (dev && !isServer) {
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendors: false,
                },
            };
        }
        return config;
    },

    devIndicators: {
        buildActivity: false, // Disables build activity indicators
    },
    experimental: {
      turbo: {
          enabled: true, // Correctly enable Turbopack
      },
  },
    webpack(config) {
        config.stats = "errors-warnings"; // Reduces logs to errors and warnings only
        return config;
    },
};

module.exports = nextConfig;
// export default nextConfig;
