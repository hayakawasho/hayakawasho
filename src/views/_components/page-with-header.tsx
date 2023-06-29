import { Head } from "./head";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";

export const PageWithHeader: FC<{
  header: ReactNode;
}> = ({ header, children, ...props }) => {
  return (
    <html lang="ja">
      <Head {...props} />
      <body>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none -z-1 invisible"
          data-ref="observer"
        ></div>
        <div
          className="fixed inset-0 w-screen h-screen pointer-events-none"
          data-ref="glWorld"
        >
          <canvas
            className="w-screen h-screen invisible"
            data-ref="canvas"
          ></canvas>
        </div>
        {header}
        {children}
        <script
          defer
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        />
        {idDev && (
          <script src="http://localhost:3000/src/entry.ts" type="module" />
        )}
        {!idDev && <script src="/assets/entry.js" type="module" />}
      </body>
    </html>
  );
};
