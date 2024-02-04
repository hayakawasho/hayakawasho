/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.{html,ts,tsx,svelte,astro}'],
  theme: {
    extend: {
      screens: {
        sp: { max: '639px' },
        pc: '640px',
      },
    },
  },
  plugins: [],
};
