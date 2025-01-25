import * as HomeLayout from "./layout";
import { WorkNavigation } from "../../model/work/navigation";
import { WorkVisuals } from "../../model/work/visuals";
import ContentLayout from "../../ui/layout";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="relative size-full">
        <HomeLayout.Wrap>
          <HomeLayout.Head>
            <div className="absolute top-0 left-0 z-[10] | sp:hidden">
              <h2 className="text-[1.2rem] tracking-[.04em] font-medium uppercase my-[--leading-trim]">
                Full site soon
              </h2>
            </div>
            <WorkNavigation posts={posts} current={"pkshatech"} />
          </HomeLayout.Head>
          <HomeLayout.Content>
            <WorkVisuals posts={posts} />
          </HomeLayout.Content>
        </HomeLayout.Wrap>
      </div>
    </ContentLayout>
  );
}
