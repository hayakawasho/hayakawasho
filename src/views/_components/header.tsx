import { css } from '@emotion/react'

export const Header = () => {
  return (
    <>
      <header className="invisible">
        <a css={logo} href="/">
          hayakawasho
        </a>
        <div id="js-menu"></div>
      </header>
    </>
  )
}

const logo = css`
  position: fixed;
  z-index: 99;
  top: 3.2rem;
  left: 2.2rem;
  display: flex;
  font-size: 1.3rem;
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 300;
  padding: 0.8rem;

  @media (min-width: 640px) {
    top: 5.6rem;
    left: 6.4rem;
    display: flex;
    font-size: 1.6rem;
  }
`
