export function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid items-center justify-center h-[--100vh] | pc:grid-cols-2 pc:h-auto pc:items-start">
      {children}
    </div>
  );
}

export function Head({ children }: { children: React.ReactNode }) {
  return (
    <div className="sp:hidden | sticky top-0 pt-[4.8rem] pb-[6rem] p-[--gap] h-[--100vh]">
      <div className="size-full relative">{children}</div>
    </div>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  return <div className="relative aspect-[4/5] w-[calc(var(--grid)*8)] | pc:w-fit pc:aspect-auto">{children}</div>;
}
