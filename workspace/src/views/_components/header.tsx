import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const Header = () => {
  return (
    <header className="" css={header}>
      <nav className="" css={header__nav}>
        <a className="-home" css={navLink} href="/">
          Index
        </a>
        <a className="-works" css={navLink} href="/works/">
          Works
        </a>
      </nav>
    </header>
  );
};

const header = css`
  position: fixed;
  top: 4rem;
  left: 50%;
  display: flex;
  z-index: 101;
  pointer-events: none;

  @media ${mq.pc} {
    top: 6rem;
  }
`;

const header__nav = css`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  transform: translateY(calc(-100% + 1em));

  @media ${mq.pc} {
    gap: 0.8rem;
    font-size: 1.3rem;
  }
`;

const navLink = css`
  display: inline-block;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0.5em;
    left: -0.85em;
    display: block;
    width: 0.4em;
    height: 0.4em;
    background-color: currentColor;
    border-radius: 50%;
    opacity: 0;
  }

  &.-home {
    &::before {
      [data-page="Home"] & {
        opacity: 1;
      }
    }
  }

  &.-works {
    &::before {
      [data-page="Works"] & {
        opacity: 1;
      }
    }
  }
`;
