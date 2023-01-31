// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const Header = _props => {
  return (
    <>
      <header css={header}>
        <a href="/" css={logo}>
          hayakawasho
        </a>
        <ul css={links}>
          <li>
            <a href="/" css={link}>
              <span className="inline-block overflow-hidden leading-[1]">
                <span css={linkLabel} data-ref="menuLabel">
                  Projects
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

const header = css`
  mix-blend-mode: difference;
`

const logo = css`
  position: absolute;
  top: 3.2rem;
  left: 2.4rem;
  display: flex;
  font-size: 1.2rem;
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 3 00;

  @media (min-width: 640px) {
  }
`

const links = css`
  position: absolute;
  top: 3.2rem;
  right: 2.4rem;
  text-align: right;
  display: flex;
  gap: 2.4rem;

  @media (min-width: 640px) {
    padding-top: 0;
    padding-right: 0;
  }
`

const link = css`
  display: inline-block;
  vertical-align: top;
  font-size: 1.2rem;
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
