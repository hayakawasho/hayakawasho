import type { WorkDTO } from "../../../_models/work/dto";
import { WorkHero } from "../../model/work/hero";
import { WorkNavigation } from "../../model/work/navigation";
import ContentLayout from "../../ui/layout";
import * as HomeLayout from "./layout";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="relative size-full" data-component="Home">
        <HomeLayout.Wrap>
          <HomeLayout.Head>
            <HomeLayout.Soon>
              <h1 className="font-[400] text-[1.3rem] tracking-[.04em]">Full site soon</h1>
            </HomeLayout.Soon>
            <HomeLayout.HeadGroup>
              <WorkNavigation posts={posts} current={"pkshatech"} className="h-[1.5em] pc:h-auto" />
              <p
                className={
                  "pc:absolute pc:right-0 pc:bottom-0 z-10 pc:hidden overflow-hidden font-[450] pc:text-[1.1rem] text-[1.4rem] uppercase tracking-[.02em]"
                }
              >
                (scroll)
              </p>
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
