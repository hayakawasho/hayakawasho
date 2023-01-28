import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    extend: {
      fontFamily: {
        en: ['Montserrat'],
        roboto: ['Roboto Condensed'],
      },
    },
  },
  plugins: [],
})
