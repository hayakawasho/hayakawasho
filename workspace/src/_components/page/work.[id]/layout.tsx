export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "relative grid h-[var(--100vh)] pc:h-fit pc:grid-cols-[calc(var(--grid)*5)_calc(var(--grid)*7)] grid-rows-[1fr_max(50vh,100vw)] pc:grid-rows-none pc:items-start overflow-hidden"
      }
    >
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "pc:sticky pc:top-0 pc:left-0 pc:h-[var(--100vh)] pc:px-[var(--gap)] px-[2.4rem] pc:pt-[4.8rem] pt-[2rem] pc:pb-[5.6rem]"
      }
    >
      <div className="relative size-full">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={"relative h-full"}>{children}</div>;
}

export function HGroup({ children }: { children: React.ReactNode }) {
  return <div className={"absolute top-0 right-0 z-10 pc:hidden"}>{children}</div>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <div className={"absolute bottom-0 left-0 w-full max-pc:hidden"}>{children}</div>;
}
