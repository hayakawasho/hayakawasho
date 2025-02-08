import { WorkInfo } from ".";
import type { WorkDTO } from "../../../../_models/work/dto";

export function WorkInfoDialog({ post }: { post: WorkDTO }) {
  return (
    <dialog
      className="fixed top-0 left-0 size-full bg-[var(--color-bg)]/75 pt-[calc(var(--vh)*50)] text-[var(--color-text)]"
      data-ref="infoDialog"
    >
      <h2 className="my-[var(--leading-trim)] mb-[16rem] overflow-hidden text-center font-[200] text-[3.6rem] leading-[1.1] tracking-[.04em]">
        {post.name}
      </h2>
      <WorkInfo metadata={post} />
    </dialog>
  );
}
