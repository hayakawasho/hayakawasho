import { WorkInfo } from ".";
import type { WorkDTO } from "../../../../_models/work/dto";

export function WorkInfoDialog({ post }: { post: WorkDTO }) {
  return (
    <dialog
      className="fixed top-0 left-0 size-full bg-[var(--color-bg)]/75 text-[var(--color-text)]"
      data-ref="infoDialog"
    >
      <div data-ref="infoDialogContent">
        <div className="h-[calc(var(--100vh)/2)]" aria-hidden="true" />
        <h2 className="my-[var(--leading-trim)] mb-[16rem] overflow-hidden text-center font-[200] text-[3.6rem] leading-[1.2] tracking-[.04em]">
          <span className="block" data-ref="infoDialogTitle">
            {post.name}
          </span>
        </h2>
        <WorkInfo metadata={post} />
        <div className="h-[calc(var(--100vh)/2)]" aria-hidden="true" />
      </div>
    </dialog>
  );
}
