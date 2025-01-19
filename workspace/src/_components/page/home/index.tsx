import { Image } from "../../model/work/image";
import * as WorkLayout from "../../model/work/layout";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="h-full">
        <WorkLayout.Root>
          <WorkLayout.Head>
            <ul className="sp:invisible | text-[1.2rem] leading-[2] tracking-[.04em] text-right">
              {posts.map((i, index) => (
                <li className={`${index > 0 ? "opacity-20" : "font-bold"}`}>{i.name}</li>
              ))}
            </ul>
            <div className="absolute top-0 left-0">
              <h2 className="text-[1.2rem] tracking-[.04em] font-bold uppercase">Full site soon</h2>
            </div>
          </WorkLayout.Head>
          <div className="relative aspect-[4/5] w-[calc(var(--grid)*10)] overflow-hidden | pc:w-fit pc:aspect-auto">
            <ul className="grid gap-[2rem]">
              {posts.map((i) => (
                <li className="h-[--100vh] overflow-hidden" key={i.id}>
                  <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={i.thumb} />
                </li>
              ))}
            </ul>
          </div>
        </WorkLayout.Root>
      </div>
    </ContentLayout>
  );
}
