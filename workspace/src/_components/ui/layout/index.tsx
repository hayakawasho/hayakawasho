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
    <body data-page={`${namespace}`}>
      <div
        aria-hidden="true"
        className="-z-1 pointer-events-none invisible fixed inset-0 h-[var(--100vh)] w-screen"
        data-ref="resizeSentinel"
      />
      <div aria-hidden="true" className="ui-bg" />
      <div aria-hidden="true" className="grid-hr bottom-0" />
      <GlBack />
      <div aria-hidden="true" className="grad grad--upper h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grad grad--lower h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grid-vr left-[2.4rem] pc:left-1/4" />
      <div aria-hidden="true" className="grid-vr left-1/2" />
      <div aria-hidden="true" className="grid-vr pc:right-auto right-[2.4rem] pc:left-3/4" />
      <div
        id="main"
        className="backface-hidden fixed pc:absolute top-0 left-0 w-full overflow-hidden pc:overflow-visible"
        data-ref="main"
      >
        <Comp data-xhr={namespace}>{children}</Comp>
      </div>
      <GlFront />
      <Cusor />
    </body>
  );
}
