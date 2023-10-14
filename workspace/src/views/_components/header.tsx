import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const Header = () => {
  return (
    <header className="" css={header}>
      <nav css={header__nav} className="">
        <a href="/" className="">
          index
        </a>
        <a href="/works/" className="">
          works
        </a>
      </nav>
    </header>
  );
};

const header = css`
  position: fixed;
  top: 4rem;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 101;
  color: var(--color-text);
  pointer-events: none;

  @media ${mq.pc} {
    top: 6rem;
  }
`;

const header__nav = css`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-family: var(--font-heading);
  font-weight: 500;
  margin-top: -1.5em;
  text-transform: uppercase;

  @media ${mq.pc} {
    font-size: 1.3rem;
  }
`;
