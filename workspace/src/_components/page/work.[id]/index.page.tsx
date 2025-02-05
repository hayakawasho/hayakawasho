import type { WorkDTO } from "../../../_models/work/dto";
import { zeroPadding } from "../../../_utils/util";
import { WorkInfo } from "../../model/work/info";
import { WorkInfoDialog } from "../../model/work/info/dialog";
import { WorkInfoTrigger } from "../../model/work/info/trigger";
import { WorkNavigation } from "../../model/work/navigation";
import { WorkScreenshots } from "../../model/work/screenshots";
import ContentLayout from "../../ui/layout";
import * as WorkLayout from "./layout";

export default function Component({
  posts,
  post,
}: {
  posts: WorkDTO[];
  post: WorkDTO;
  currentIndex: number;
}) {
  return (
    <ContentLayout namespace="work-single" asChild>
      <div className="relative size-full" data-component="WorkSingle">
        <WorkLayout.Wrap>
          <WorkLayout.Content>
            <WorkScreenshots post={post} />
          </WorkLayout.Content>
          <WorkLayout.Head>
            <div className="grid gap-[3.2rem]">
              <WorkNavigation posts={posts} current={post.id} />
            </div>
            <WorkLayout.Info>
              <WorkInfo metadata={post} />
            </WorkLayout.Info>
          </WorkLayout.Head>
        </WorkLayout.Wrap>
        <WorkLayout.HGroup>
          <WorkInfoTrigger />
          <h1 className="my-[var(--leading-trim)] flex gap-[.5em] font-[450] text-[1.3rem] tracking-[.04em]">
            <span>{post.name}</span>
          </h1>
        </WorkLayout.HGroup>
        <WorkInfoDialog post={post} />
      </div>
    </ContentLayout>
  );
}
