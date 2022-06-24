/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          preprocess: require('svelte-preprocess')(),
          emitCss: false,
        },
      },
    })

    return config
  },
}

module.exports = nextConfig
