// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css } from '@emotion/react'
import { Head } from './Head'
import { Header } from './Header'

const idDev = process.env.NODE_ENV !== 'production'

export const PageWithHeader = props => {
  return (
    <html lang="ja">
      <Head title={props.title} description={props.description} />
      <body>
        <div
          className="fixed inset-0 w-screen h-screen pointer-events-none -z-1 invisible"
          data-component="Observer"
          data-ignore
          aria-hidden="true"
        ></div>
        <div id="js-glWorld" className="fixed inset-0 w-screen h-screen pointer-events-none">
          <canvas className="w-full h-full" data-ref="canvas"></canvas>
        </div>
        {props.header}
        {props.children}
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          defer
        />
        {idDev && <script type="module" src="http://localhost:3000/src/entry.ts" />}
        {!idDev && <script type="module" src="/assets/entry.js" />}
      </body>
    </html>
  )
}
