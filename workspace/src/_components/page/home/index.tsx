import * as HomeLayout from "./layout";
import { WorkNavigation } from "../../model/work/navigation";
import { WorkVisuals } from "../../model/work/visuals";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="h-full">
        <HomeLayout.Root>
          <HomeLayout.Head>
            <div className="absolute top-0 left-0">
              <h2 className="text-[1.2rem] tracking-[.04em] font-medium uppercase">Full site soon</h2>
            </div>
            <WorkNavigation posts={posts} current={"pkshatech"} />
          </HomeLayout.Head>
          <HomeLayout.Content>
            <WorkVisuals posts={posts} />
          </HomeLayout.Content>
        </HomeLayout.Root>
      </div>
    </ContentLayout>
  );
}
