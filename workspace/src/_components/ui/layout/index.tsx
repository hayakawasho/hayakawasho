import { Slot } from "@radix-ui/react-slot";
import Cusor from "../cusor";
import { GlBack, GlFront } from "../gl";

export default function Component({
  namespace,
  children,
  asChild,
}: {
  children: React.ReactNode;
  namespace: string;
  asChild?: true;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <body>
      <div
        aria-hidden="true"
        className="-z-1 pointer-events-none invisible fixed inset-0 h-[var(--100vh)] w-screen"
        data-ref="resizeSentinel"
      />
      <div aria-hidden="true" className="ui-bg" />
      <GlBack />
      <div aria-hidden="true" className="grad grad--upper h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grad grad--lower h-[20vh] pc:h-[25vh]" />
      <div
        id="main"
        className="backface-hidden fixed pc:absolute top-0 left-0 w-full overflow-hidden pc:overflow-visible"
        data-ref="main"
      >
        <div data-xhr={namespace}>
          <Comp className="">
            {children}
          </Comp>
        </div>
      </div>
      <GlFront />
      <Cusor />
    </body>
  );
}
