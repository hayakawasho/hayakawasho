import { Slot } from "@radix-ui/react-slot";
import noiseImg from "../../../assets/noise_1100x1100.webp";
import noiseSpImg from "../../../assets/noise_550x550.webp";

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
    <body className={namespace}>
      <div
        aria-hidden="true"
        className="fixed inset-0 w-screen h-[--100vh] pointer-events-none -z-1 invisible"
        data-ref="resizeSentinel"
      />
      <div aria-hidden="true" className="ui-bg" />
      <canvas
        aria-hidden="true"
        className="ui-canvas"
        data-ref="backCanvas"
        // data-pc={noiseImg.src}
        // data-mob={noiseSpImg.src}
      />
      <div aria-hidden="true" className="grad grad--upper | h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grad grad--lower | h-[20vh] pc:h-[25vh]" />
      <div aria-hidden="true" className="grid-vr left-[2rem] | pc:left-1/4" />
      <div aria-hidden="true" className="grid-vr left-1/2" />
      <div aria-hidden="true" className="grid-vr right-[2rem] | pc:right-auto pc:left-3/4" />

      <div
        id="main"
        className="w-full absolute top-0 left-0 backface-hidden | sp:fixed sp:overflow-hidden"
        data-ref="main"
      >
        <Comp data-xhr={namespace}>{children}</Comp>
      </div>

      <canvas aria-hidden="true" className="ui-canvas" data-ref="frontCanvas" />
      <div className="ui-cursor" data-ref="cursor" />
    </body>
  );
}
