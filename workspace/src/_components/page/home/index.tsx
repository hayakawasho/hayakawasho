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
            <div className="flex justify-center gap-[1rem] absolute top-1/2 left-0 z-10 text-[#fff] | pc:hidden">
              <ul className="ml-[-40.2em] text-[3.8rem] font-extralight tracking-[.04em] flex items-center gap-[1rem] my-[--leading-trim] leading-[1.1]">
                {posts.map((i) => (
                  <li className="whitespace-nowrap flex items-center gap-[1rem]" key={i.id}>
                    {i.name}
                    <span className="opacity-30 font-light scale-75">/</span>
                  </li>
                ))}
              </ul>
              <ul className="text-[3.8rem] font-extralight tracking-[.04em] flex items-center gap-[1rem] my-[--leading-trim] leading-[1.1]">
                {posts.map((i) => (
                  <li className="whitespace-nowrap flex items-center gap-[1rem]" key={i.id}>
                    {i.name}
                    <span className="opacity-30 font-light scale-75">/</span>
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
