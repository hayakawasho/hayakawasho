import type { ReactNode } from "react";

export const Content = (props: { children: ReactNode }) => {
  return (
    <div className="relative" data-ref="main">
      {props.children}
    </div>
  );
};
