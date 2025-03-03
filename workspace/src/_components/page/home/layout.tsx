export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "relative pc:grid h-[var(--100vh)] pc:h-auto pc:grid-cols-[calc(var(--grid)*7)_1fr] pc:items-start pc:justify-center"
      }
    >
      {children}
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={"pc:sticky pc:top-0 w-full"}>{children}</div>;
}

export function HeroThumb({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "pc:static absolute bottom-[3.2rem] left-1/2 pc:flex pc:h-[var(--100vh)] pc:items-center pc:justify-center"
      }
      data-ref="heroNavigation"
    >
      <div className="-ml-[2.4rem] pc:ml-0">{children}</div>
    </div>
  );
}
