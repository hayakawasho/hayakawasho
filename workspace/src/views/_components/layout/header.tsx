import { css } from '@emotion/react';
import { mq } from '@/_foundation/mq';
// import { Link } from "../_components/ui/link";

export const Header = () => {
  return <header className=""></header>;
};

const header = css`
  position: fixed;
  width: 100%;
  top: 4rem;
  left: 0;
  justify-content: flex-end;
  // left: 50%;
  display: flex;
  z-index: 101;
  pointer-events: none;

  @media ${mq.pc} {
    top: 6rem;
    justify-content: center;
  }
`;

const header__nav = css`
  display: flex;
  // flex-direction: column;
  gap: 0.4rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  // transform: translateY(calc(-100% + 1.5em));

  @media ${mq.pc} {
    gap: 0.8rem;
    font-size: 1.3rem;
  }
`;

const navLinks = css`
  padding-right: var(--grid);
  // transform: translateX(4.8rem);
`;

const navLink = css`
  display: inline-block;
  position: relative;
  pointer-events: auto;
  border-radius: 5rem;
  padding: 0.6rem 1.6rem 0.5rem 1.6rem;
  margin-left: -1.6rem;
  margin-top: -1.2rem;
  margin-right: -1.6rem;
`;
