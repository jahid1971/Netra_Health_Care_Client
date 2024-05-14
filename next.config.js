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

    webpack(config) {
        config.ignoreWarnings = [
          (warning) =>
            warning.message.includes("__barrel_optimize__"), // Suppress specific warning logs
        ];
        return config;
      },

      devIndicators: {
        buildActivity: false, // Disables build activity indicators
      },
      webpack(config) {
        config.stats = "errors-warnings"; // Reduces logs to errors and warnings only
        return config;
      },
};

module.exports = nextConfig;
// export default nextConfig;
