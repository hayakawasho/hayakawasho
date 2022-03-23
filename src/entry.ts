import "ress";
import "./assets/styles/global.css";
import "./tailwind.dist.css";

import { initApp } from "./client";

const isDev = process.env.NODE_ENV === "development";

document.addEventListener("DOMContentLoaded", initApp);

if (isDev) {
  const showStats = async () => {
    const Stats = await (
      (await import("https://cdn.skypack.dev/stats.js")) as any
    ).default;

    const stats = new Stats();
    stats.showPanel(0);

    document.body.appendChild(stats.dom);

    const loop = () => {
      stats.update();
      requestAnimationFrame(loop);
    };

    loop();
  };

  showStats();
}
