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
              <h1 className="font-[400] pc:text-[1.3rem] pc:text-[var(--color-text)] text-[1.4rem] text-[var(--theme-text)] tracking-[.04em]">
                Full site soon
              </h1>
            </HomeLayout.Soon>
            <HomeLayout.HeadGroup>
              <WorkNavigation posts={posts} current={"pkshatech"} className="h-[1.5em] pc:h-auto" />
              <div className="relative z-10 pc:hidden overflow-hidden font-[400] text-[1.4rem] uppercase tracking-[.02em]">
                <p className="opacity-40">(scroll)</p>
                <div aria-hidden="true" className="-translate-x-full absolute top-0 left-0">
                  (scroll)
                </div>
              </div>
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
