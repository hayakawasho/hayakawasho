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
          <h1 className="my-[var(--leading-trim)] whitespace-nowrap font-[400] text-[7rem] tracking-[.04em] opacity-0 mix-blend-difference">
            {post.name}
          </h1>
        </WorkLayout.Title>
        <WorkLayout.HGroup>
          <WorkInfoTrigger />
          <h1 className="my-[var(--leading-trim)] flex gap-[.5em] font-[450] text-[1.3rem] tracking-[.04em]">
            <span>{zeroPadding(currentIndex)}.</span>
            <span>{post.name}</span>
          </h1>
        </WorkLayout.HGroup>
        <WorkInfoDialog post={post} />
        <WorkLayout.Wrap>
          <WorkLayout.Head>
            <div className="grid gap-[3.2rem]">
              <div className="my-[var(--leading-trim)] hidden text-right font-[550] text-[4.2rem] leading-[1] tracking-[-.08em] max-pc:hidden">
                {zeroPadding(currentIndex)}
              </div>
              <WorkNavigation posts={posts} current={post.id} />
            </div>
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
