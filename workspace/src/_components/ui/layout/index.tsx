import { Slot } from "@radix-ui/react-slot";
import type { RouteName } from "../../../const";
import Cusor from "../cusor";
import { GlBack, GlFront } from "../gl";

export default function Component({
  namespace,
  children,
  header,
  asChild,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  namespace: RouteName;
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
      {header}
      <div
        id="main"
        className="backface-hidden fixed pc:absolute top-0 left-0 w-full overflow-hidden pc:overflow-visible"
      >
        <Comp data-xhr={namespace}>{children}</Comp>
      </div>
      <GlFront />
      <Cusor />
    </body>
  );
}
