import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
  extract: {
    include: ["index.html", "./src/**/*.{tsx,svelte}"],
    exclude: ["node_modules/**/*", ".git/**/*"],
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
        ".fit2parent": {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        },
        ".sizefull": {
          width: "100%",
          height: "100%",
        },
      });
    }),
  ],
});
