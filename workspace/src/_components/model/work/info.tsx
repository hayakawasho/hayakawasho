import { Slot } from "@radix-ui/react-slot";

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-[1.2rem] text-[1.1rem] pc:text-[1.2rem]">{children}</div>;
}

export function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <dl className="flex justify-between">
      <dt className="opacity-50 text-[1.1rem]">
        <span className="inline-block uppercase" data-ref="infoText">
          {label}
        </span>
      </dt>
      <dd>{children}</dd>
    </dl>
  );
}

export function Content({ children, asChild, ...props }: { children: React.ReactNode; asChild?: true }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp {...props} data-ref="test" className="tracking-[.04em]">
      {children}
    </Comp>
  );
}
