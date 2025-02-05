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
            <div className="absolute top-0 left-0 z-10 mix-blend-difference max-pc:hidden">
              <h1 className="my-[var(--leading-trim)] font-[400] text-[1.3rem] tracking-[.04em]">Full site soon</h1>
            </div>
            <div className="pointer-events-none absolute top-0 left-0 z-10 opacity-0 max-pc:hidden">
              <div className="mt-[-.35em] font-[500] text-[4rem] tracking-[-.02em]">01</div>
            </div>
            <WorkNavigation posts={posts} current={"pkshatech"} />
          </HomeLayout.Head>
          <HomeLayout.Content>
            <WorkHero posts={posts} />
          </HomeLayout.Content>
        </HomeLayout.Wrap>
      </div>
    </ContentLayout>
  );
}
