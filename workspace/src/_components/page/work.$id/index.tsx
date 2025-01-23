import * as WorkLayout from "./layout";
import { WorkInfo } from "../../model/work/info";
import { WorkInfoToggle } from "../../model/work/info-toggle";
import { WorkNavigation } from "../../model/work/navigation";
import { WorkScreenshots } from "../../model/work/screenshots";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts, post }: { posts: WorkDTO[]; post: WorkDTO; currentIndex: number }) {
  return (
    <ContentLayout namespace="work-single" asChild>
      <div className="relative size-full">
        <h1 className="absolute bottom-[4rem] left-[--grid] text-[3.6rem] font-extralight tracking-[.04em] my-[--leading-trim] leading-[1.1] z-10 | pc:sr-only">
          {post.name}
        </h1>
        <WorkInfoToggle />
        <dialog className="">
          <h2>{post.name}</h2>
          <WorkInfo metadata={post} />
        </dialog>
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
