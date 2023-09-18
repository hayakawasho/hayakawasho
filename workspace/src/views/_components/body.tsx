import type { ReactNode } from "react";

export const Body = (props: { children: ReactNode; namespace: string }) => {
  return (
    <div
      className="w-full absolute top-0 left-0 overflow-hidden"
      data-load-container={props.namespace}
      data-ref="main"
    >
      {props.children}
    </div>
  );
};
