import * as WorkLayout from "./layout";
import { zeroPadding } from "../../../_utils/util";
import { WorkInfo } from "../../model/work/info";
import { WorkInfoDialog } from "../../model/work/info/dialog";
import { WorkInfoTrigger } from "../../model/work/info/trigger";
import { WorkNavigation } from "../../model/work/navigation";
import { WorkScreenshots } from "../../model/work/screenshots";
import ContentLayout from "../../ui/layout";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({
  posts,
  post,
  currentIndex,
}: {
  posts: WorkDTO[];
  post: WorkDTO;
  currentIndex: number;
}) {
  return (
    <ContentLayout namespace="work-single" asChild>
      <div className="relative size-full" data-component="WorkSingle">
        <WorkLayout.Title>
          <h1 className="text-[7rem] tracking-[.04em] font-[100] my-[--leading-trim] mix-blend-difference whitespace-nowrap opacity-0">
            {post.name}
          </h1>
        </WorkLayout.Title>
        <WorkLayout.HGroup>
          <WorkInfoTrigger />
          <h1 className="text-[1.3rem] tracking-[.04em] font-[450] my-[--leading-trim] flex gap-[.5em]">
            <span>{zeroPadding(currentIndex)}.</span>
            <span>{post.name}</span>
          </h1>
        </WorkLayout.HGroup>
        <WorkInfoDialog post={post} />
        <WorkLayout.Wrap>
          <WorkLayout.Head>
            <WorkNavigation posts={posts} current={post.id} />
            <WorkLayout.Info>
              <WorkInfo metadata={post} />
            </WorkLayout.Info>
          </WorkLayout.Head>
          <WorkLayout.Content>
            <WorkScreenshots post={post} />
          </WorkLayout.Content>
        </WorkLayout.Wrap>
      </div>
    </ContentLayout>
  );
}
