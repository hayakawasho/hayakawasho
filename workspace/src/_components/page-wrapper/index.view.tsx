import type { FC, ReactNode } from "react";

export const PageWrapper: FC<{
  namespace: string;
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, namespace }) => {
  return (
    <>
      {header}
      <div
        aria-live="polite"
        className="w-full absolute top-0 left-0 backface-hidden"
        data-ref="main"
        hx-history-elt=""
        id="main"
      >
        <div className="h-full" data-xhr={namespace}>
          {children}
        </div>
      </div>
    </>
  );
};
