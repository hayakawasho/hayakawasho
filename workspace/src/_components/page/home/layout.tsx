export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className={"relative grid h-[var(--100vh)] pc:h-auto pc:grid-cols-2 pc:items-start justify-center"}>
      {children}
    </div>
  );
}

// export function Soon({ children }: { children: React.ReactNode }) {
//   return <div className={"absolute top-0 right-0 z-10"}>{children}</div>;
// }

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "pointer-events-none absolute pc:sticky pc:top-0 top-0 left-0 size-full pc:h-[var(--100vh)] pc:p-[var(--gap)] px-[2.4rem] pc:pt-[4.8rem] pt-[2rem] pb-[2rem] pc:pb-[5.6rem]"
      }
    >
      <div className="relative size-full">{children}</div>
    </div>
  );
}

export function HeadGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute pc:relative top-0 pc:bottom-auto pc:block flex pc:h-full w-full items-start justify-between overflow-hidden pc:overflow-visible pc:text-right pc:text-[var(--color-text)] text-[var(--theme-text)]">
      {children}
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className={"relative pc:aspect-auto pc:w-fit w-[calc(var(--grid)*12)] overflow-hidden"}>{children}</div>;
}
