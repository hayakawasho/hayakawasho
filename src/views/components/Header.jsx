// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Header = _props => {
  return (
    <>
      <header>
        <a href="/" css={logo}>
          hayakawasho
        </a>
        <ul css={links}>
          <li>
            <a href="/" css={link}>
              <span className="inline-block overflow-hidden leading-[1]">
                <span css={linkLabel} data-ref="menuLabel">
                  Index
                </span>
              </span>
            </a>
          </li>
          <li>
            <a href="/about/" css={link}>
              <span className="inline-block overflow-hidden leading-[1]">
                <span css={linkLabel} data-ref="menuLabel">
                  About
                </span>
              </span>
            </a>
          </li>
        </ul>
      </header>
    </>
  )
}

const logo = css`
  position: fixed;
  z-index: 99;
  top: 3.2rem;
  left: 2.4rem;
  display: flex;
  font-size: 1.3rem;
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 300;

  @media (min-width: 640px) {
  }
`

const links = css`
  position: fixed;
  z-index: 99;
  top: 3.2rem;
  right: 2.4rem;
  text-align: right;
  display: flex;
  gap: 2rem;

  @media (min-width: 640px) {
    padding-top: 0;
    padding-right: 0;
  }
`

const link = css`
  display: inline-block;
  vertical-align: top;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  font-weight: 300;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 1.3rem;
    opacity: 1;
    pointer-events: auto;
  }

  > span {
    line-height: 1;
    display: inline-block;
  }

  .is-menuOpen & {
    pointer-events: auto;
  }
`

const linkLabel = css`
  display: inline-block;
  // transform: translateY(100%);
  transform-origin: left;

  @media (min-width: 640px) {
    transform: none;
  }

  .is-menuAnimating & {
    will-change: transform, opacity;
  }
`
