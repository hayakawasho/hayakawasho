// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css, keyframes } from '@emotion/react'
import { Head } from './Head'
import { Header } from './Header'
import { noiseTexture } from './noise'

const idDev = process.env.NODE_ENV !== 'production'

export const PageWithHeader = props => {
  return (
    <html lang="ja">
      <Head title={props.title} description={props.description} />
      <body>
        <div css={noise}></div>
        <div
          className="fixed inset-0 w-screen h-screen pointer-events-none -z-1 invisible"
          data-component="Observer"
          aria-hidden="true"
        ></div>
        <div id="js-glWorld" className="fixed inset-0 w-screen h-screen pointer-events-none">
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
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

const noiseTrans = keyframes`
  0% {
    transform: translate3d(0, 9rem, 0)
  }

  10% {
    transform: translate3d(-1rem,-4rem,0)
  }

  20% {
    transform: translate3d(-8rem,2rem,0)
  }

  30% {
    transform: translate3d(9rem,-9rem,0)
  }

  40% {
    transform: translate3d(-2rem,7rem,0)
  }

  50% {
    transform: translate3d(-9rem,-4rem,0)
  }

  60% {
    transform: translate3d(2rem,6rem,0)
  }

  70% {
    transform: translate3d(7rem,-8rem,0)
  }

  80% {
    transform: translate3d(-9rem,1rem,0)
  }

  90% {
    transform: translate3d(6rem,-5rem,0)
  }

  to {
    transform: translate3d(-7rem,0,0)
  }
`

const noise = css`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;

  &:before {
    content: '';
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    background-image: url(${noiseTexture});
    background-position: 50%;
    position: absolute;
    left: -10rem;
    top: -10rem;
    will-change: transform;
    animation: ${noiseTrans} 1s steps(2) infinite;
    pointer-events: none;
    opacity: 0.6;
  }
`
