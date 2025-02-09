import type { WorkDTO } from "../../../_models/work/dto";
import { zeroPadding } from "../../../_utils/util";
import { WorkHero } from "../../model/work/hero";
import { WorkNavigation } from "../../model/work/navigation";
import ContentLayout from "../../ui/layout";
import * as HomeLayout from "./layout";

export default function Component({ posts, total }: { posts: WorkDTO[]; total: number }) {
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
              <WorkNavigation posts={posts} current={"pkshatech"} className="max-pc:h-[1em] max-pc:leading-[1.2]" />
              <div className="relative z-10 pc:hidden overflow-hidden font-[400] text-[1.4rem] uppercase leading-[1.2]">
                <div className="">
                  {zeroPadding(1)} / {zeroPadding(total)}
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
