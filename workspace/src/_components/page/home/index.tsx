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
            <div className="flex justify-center gap-[1rem] whitespace-nowrap absolute top-1/2 left-0 z-10 mix-blend-difference | pc:hidden">
              <ul className="text-[3.6rem] font-extralight tracking-[.04em] flex items-center gap-[1rem]">
                {posts.map((i) => (
                  <li className="whitespace-nowrap flex items-center gap-[1rem]" key={i.id}>
                    {i.name}
                    <span>/</span>
                  </li>
                ))}
              </ul>
              <ul className="text-[3.6rem] font-extralight tracking-[.04em] flex items-center gap-[1rem]">
                {posts.map((i) => (
                  <li className="whitespace-nowrap flex items-center gap-[1rem]" key={i.id}>
                    {i.name}
                    <span>/</span>
                  </li>
                ))}
              </ul>
            </div>
            <WorkVisuals posts={posts} />
          </HomeLayout.Content>
        </HomeLayout.Root>
      </div>
    </ContentLayout>
  );
}
