import cx from "clsx";
import type { FC } from "react";

export const Svg: FC<{
  name: string;
  className?: string;
}> = ({ className, name }) => {
  return (
    <svg
      aria-hidden="true"
      className={cx(className, "w-full h-full pointer-events-none absolute top-0 left-0 fill-current")}
    >
      <use href={`#${name}`}></use>
    </svg>
  );
};
