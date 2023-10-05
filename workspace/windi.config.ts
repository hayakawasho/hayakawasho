import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["index.html", "./src/**/*.{tsx,svelte}"],
    exclude: ["node_modules/**/*", ".git/**/*"],
  },
  theme: {
    screens: {
      sp: { max: "639px" },
      pc: "640px",
    },
  },
  plugins: [],
});
