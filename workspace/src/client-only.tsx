import './entry';
import { useEffect } from 'react';

export const ClientOnly = () => {
  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === 'development') {
        const Stats = await ((await import('https://cdn.skypack.dev/stats.js.fps?dts')) as any)
          .default;
        const stats = new Stats();
        stats.showPanel(0);

        document.body.appendChild(stats.dom);

        const loop = () => {
          stats.update();
          requestAnimationFrame(loop);
        };

        loop();
      }
    })();
  }, []);

  return <></>;
};
