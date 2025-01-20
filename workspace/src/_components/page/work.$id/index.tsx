// import { WorkPresenter } from "../../../_models/work/presenter";
import { WorkInfo } from "../../model/work/info";
import { WorkInfoToggle } from "../../model/work/info-toggle";
import { WorkScreenshots } from "../../model/work/screenshots";
import { WorkNavigation } from "../../model/work/navigation";
import * as WorkLayout from "../../model/work/layout";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts, post }: { posts: WorkDTO[]; post: WorkDTO; currentIndex: number }) {
  // const metadata = WorkPresenter.complete(post);

  return (
    <ContentLayout namespace="work-single" asChild>
      <div className="h-full relative">
        <h1 className="sr-only">{post.name}</h1>
        <WorkInfoToggle />
        <dialog className="">
          <h2>{post.name}</h2>
          <WorkInfo metadata={post} />
        </dialog>
        <div className="">
          <WorkLayout.Head>
            <WorkNavigation posts={posts} current={post.id} />
            <div className="w-full absolute bottom-0 left-0 | sp:hidden">
              <WorkInfo metadata={post} />
            </div>
          </WorkLayout.Head>
          <div className="relative aspect-[4/5] w-[calc(var(--grid)*9)] | pc:w-fit pc:aspect-auto">
            <WorkScreenshots post={post} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
