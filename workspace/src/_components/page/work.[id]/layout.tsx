export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative grid items-start justify-center h-[var(--100vh)] | pc:grid-cols-2 pc:h-auto pc:items-start`}
    >
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`max-pc:hidden | sticky top-0 left-0 py-[4rem] px-[--grid] size-full right-[var(--gap)] pt-[4.8rem] pb-[6rem] p-[var(--gap)] h-[var(--100vh)]`}
    >
      <div className="size-full relative">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative aspect-4/5 w-[calc(var(--grid)*12)] | pc:w-full pc:min-h-[var(--100vh)]`}>{children}</div>
  );
}

export function HGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-[2.4rem] px-[2rem] w-full flex items-center justify-between | pc:hidden">
      {children}
    </div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 | max-pc:hidden">{children}</div>
  );
}

export function Info({ children }: { children: React.ReactNode }) {
  return <div className="w-full absolute bottom-0 left-0 | max-pc:hidden">{children}</div>;
}
