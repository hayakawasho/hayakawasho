import { WorkInfo } from ".";
import type { WorkDTO } from "../../../../_models/work/dto";

export function WorkInfoDialog({ post }: { post: WorkDTO }) {
  return (
    <dialog className="fixed top-0 left-0 size-full bg-[var(--color-bg)]/60 pt-[calc(var(--vh)*50)] text-[var(--color-text)]" data-ref="infoDialog">
      <h2 className="mb-[16rem] text-center font-[200] text-[3.6rem] tracking-[.08em]">{post.name}</h2>
      <WorkInfo metadata={post} />
    </dialog>
  );
}
