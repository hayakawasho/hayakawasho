export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={"relative grid h-[var(--100vh)] pc:h-auto pc:grid-cols-2 items-start pc:items-start justify-center"}
    >
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={"sticky top-0 left-0 size-full h-[var(--100vh)] px-[var(--gap)] pt-[4.8rem] pb-[5.6rem] max-pc:hidden"}
    >
      <div className="relative size-full">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={"relative aspect-4/5 pc:h-[var(--100vh)] pc:w-full w-[calc(var(--grid)*12)]"}>{children}</div>;
}

export function HGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className={"absolute bottom-[2.4rem] flex pc:hidden w-full items-center justify-between px-[2rem]"}>
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <div className={"fixed top-1/2 left-1/2 z-20 translate-x-1/2 translate-y-1/2 max-pc:hidden"}>{children}</div>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <div className={"absolute bottom-0 left-0 w-full max-pc:hidden"}>{children}</div>;
}
