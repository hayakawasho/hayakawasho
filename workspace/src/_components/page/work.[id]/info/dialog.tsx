import type { WorkDTO } from "../../../../_models/work/dto";
import Info from "./info";

export default function Component({ metadata }: { metadata: WorkDTO }) {
  return (
    <dialog className="fixed top-0 left-0 size-full text-[var(--color-text)]" data-ref="infoDialog">
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--color-bg)]/80"
        aria-hidden="true"
        data-ref="infoDialogBackground"
      />
      <div className="relative" data-ref="infoDialogContent">
        <div className="h-[calc(var(--100vh)/2)]" aria-hidden="true" />
        <h2
          className="my-[var(--leading-trim)] mb-[16rem] overflow-hidden text-center font-[200] text-[3.6rem] leading-[1.2] tracking-[.04em]"
          data-ref="infoScrollItem"
        >
          <span className="backface-hidden block" data-ref="infoDialogTitle">
            {metadata.name}
          </span>
        </h2>
        <Info metadata={metadata} />
        <div className="h-[calc(var(--100vh)/2)]" aria-hidden="true" />
      </div>
    </dialog>
  );
}
