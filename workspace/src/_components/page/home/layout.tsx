export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative grid justify-center h-[--100vh] | pc:grid-cols-2 pc:h-auto pc:items-start`}>
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`absolute top-0 left-0 pt-[4rem] px-[2rem] size-full pointer-events-none | pc:sticky pc:top-0 pc:pt-[4.8rem] pc:pb-[6rem] pc:p-[--gap] pc:h-[--100vh]`}
    >
      <div className="size-full relative">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className="relative w-[calc(var(--grid)*12)] overflow-hidden pc:w-fit pc:aspect-auto">{children}</div>;
}
