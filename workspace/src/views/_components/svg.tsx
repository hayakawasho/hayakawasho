import { css } from "@emotion/react";
import type { FC } from "react";

export const Svg: FC<{
  name: string;
  className?: string;
}> = (props) => {
  return (
    <>
      <svg className={props.className} css={svg}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    </>
  );
};

const svg = css`
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  fill: currentColor;
`;
