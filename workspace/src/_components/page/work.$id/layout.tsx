export function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative grid items-start justify-center h-[--100vh] | pc:grid-cols-2 pc:h-auto pc:items-start`}>
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`sp:hidden | sticky top-0 left-0 py-[4rem] px-[--grid] size-full pc:right-[--gap] pc:pt-[4.8rem] pc:pb-[6rem] pc:p-[--gap] pc:h-[--100vh]`}
    >
      <div className="size-full relative">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className={`relative aspect-[4/5] w-[calc(var(--grid)*12)] | pc:w-full pc:min-h-[--100vh]`}>{children}</div>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <div className="absolute bottom-[6.4rem] right-[2rem] | pc:hidden">{children}</div>;
}

export function Trigger({ children }: { children: React.ReactNode }) {
  return <div className="absolute z-10 bottom-[2.4rem] right-[2rem] | pc:hidden">{children}</div>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <div className="w-full absolute bottom-0 left-0 | sp:hidden">{children}</div>;
}
