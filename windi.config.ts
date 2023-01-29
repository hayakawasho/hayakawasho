import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  extract: {
    include: ['./src/**/*.{js,ts,jsx,tsx,svelte}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    extend: {
      fontFamily: {
        //
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.in': {
          position: 'relative',
          width: '100%',
          height: '100%',
        },
        '.fit2parent': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
        },
      })
    }),
  ],
})
