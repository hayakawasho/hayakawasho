import { Slot } from "@radix-ui/react-slot";
import Cusor from "../cusor";
import { GlFront, GlBack } from "../gl";

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
        className="fixed inset-0 w-screen h-[--100vh] pointer-events-none -z-1 invisible"
        data-ref="resizeSentinel"
      />
      <div aria-hidden="true" className="ui-bg" />
      <div aria-hidden="true" className="grid-hr bottom-0" />
      <GlBack />
      <div aria-hidden="true" className="grad grad--upper h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grad grad--lower h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grid-vr left-[2rem] | pc:left-1/4" />
      <div aria-hidden="true" className="grid-vr left-1/2" />
      <div aria-hidden="true" className="grid-vr right-[2rem] | pc:right-auto pc:left-3/4" />

      <div
        id="main"
        className="fixed overflow-hidden w-full top-0 left-0 backface-hidden | pc:overflow-visible pc:absolute"
        data-ref="main"
      >
        <Comp data-xhr={namespace}>{children}</Comp>
      </div>

      <GlFront />
      <canvas aria-hidden="true" className="ui-canvas" data-ref="glFront" />
      <Cusor />
    </body>
  );
}
