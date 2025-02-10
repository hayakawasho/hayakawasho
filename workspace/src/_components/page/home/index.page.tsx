import type { WorkDTO } from "../../../_models/work/dto";
import { WorkHero } from "../../model/work/hero";
import { WorkNavigation } from "../../model/work/navigation";
import ContentLayout from "../../ui/layout";
import * as HomeLayout from "./layout";

export default function Component({ posts, total }: { posts: WorkDTO[]; total: number }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="relative size-full" data-component="Home">
        <HomeLayout.Wrap>
          <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
          <HomeLayout.Head>
            <HomeLayout.HeadGroup>
              <WorkNavigation posts={posts} current={"pkshatech"} className="max-pc:h-[1em] max-pc:leading-[1.2]" />
            </HomeLayout.HeadGroup>
          </HomeLayout.Head>
          <HomeLayout.Content>
            <WorkHero posts={posts} />
          </HomeLayout.Content>
        </HomeLayout.Wrap>
      </div>
    </ContentLayout>
  );
}
