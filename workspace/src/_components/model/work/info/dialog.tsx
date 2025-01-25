import type { WorkDTO } from "../../../../_models/work/dto";
import { WorkInfo } from ".";

export function WorkInfoDialog({ post }: { post: WorkDTO }) {
  return (
    <dialog className="">
      <h2>{post.name}</h2>
      <WorkInfo metadata={post} />
    </dialog>
  );
}
