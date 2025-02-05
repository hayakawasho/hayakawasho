import { WorkInfo } from ".";
import type { WorkDTO } from "../../../../_models/work/dto";

export function WorkInfoDialog({ post }: { post: WorkDTO }) {
  return (
    <dialog className="">
      <h2>{post.name}</h2>
      <WorkInfo metadata={post} />
    </dialog>
  );
}
