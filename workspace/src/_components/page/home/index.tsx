import * as WorkLayout from "./layout";
import { Image } from "../../model/work/image";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ContentLayout namespace="home" asChild>
      <div className="h-full">
        <WorkLayout.Root>
          <WorkLayout.Head>
            <div className="absolute top-0 left-0">
              <h2 className="text-[1.2rem] tracking-[.04em] font-bold uppercase">Full site soon</h2>
            </div>
            <ul className="sp:invisible | text-[1.2rem] leading-[2] tracking-[.04em] text-right">
              {posts.map((i, index) => (
                <li className={`${index > 0 ? "opacity-20" : "font-bold"}`}>{i.name}</li>
              ))}
            </ul>
          </WorkLayout.Head>
          <WorkLayout.Content>
            <ul className="">
              {posts.map((i) => (
                <li className="h-[--100vh] overflow-hidden" key={i.id}>
                  <Image className="w-full h-full object-cover | pc:h-fit pc:min-h-[--100vh]" metadata={i.thumb} />
                </li>
              ))}
            </ul>
          </WorkLayout.Content>
        </WorkLayout.Root>
      </div>
    </ContentLayout>
  );
}
