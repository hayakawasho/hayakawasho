// import { WorkPresenter } from "../../../_models/work/presenter";
import { Image } from "../../model/work/image";
import { WorkInfo } from "../../model/work/info";
import * as WorkLayout from "../../model/work/layout";
import ContentLayout from "../../ui/layout/default";
import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts, post }: { posts: WorkDTO[]; post: WorkDTO; currentIndex: number }) {
  // const metadata = WorkPresenter.complete(post);

  return (
    <ContentLayout namespace="work-single" asChild>
      <div className="h-full relative">
        <h1 className="sr-only">{post.name}</h1>
        <button className="overflow-hidden absolute bottom-[4rem] left-[--gap] border-solid border-[1px] border-current rounded-full my-[--leading-trim] w-[5.4rem] text-[1.2rem] leading-[1.2] text-center | pc:hidden">
          <span className="h-[1.2em] block">
            <span className="flex justify-center">
              <span aria-hidden="true" className="w-[.5em] inline-block">
                I
              </span>
              <span aria-hidden="true" className="tracking-[.08em]">
                N
              </span>
              <span aria-hidden="true">F</span>
              <span aria-hidden="true" className="tracking-[.04em]">
                O
              </span>
              <span className="sr-only">Info</span>
            </span>
            <span className="tracking-[.04em] uppercase">Close</span>
          </span>
        </button>
        <dialog>
          <h2>{post.name}</h2>
          <WorkInfo metadata={post} />
        </dialog>
        <WorkLayout.Root>
          <WorkLayout.Head>
            <ul className="text-[1.2rem] tracking-[.04em] text-right grid gap-[1rem]">
              {posts.map((i, index) => (
                <li key={index} className={`${post.id === i.id ? "font-bold" : "opacity-20"}`}>
                  {i.name}
                </li>
              ))}
            </ul>
            <div className="w-full absolute bottom-0 left-0 | sp:hidden">
              <WorkInfo metadata={post} />
            </div>
          </WorkLayout.Head>
          <div className="relative aspect-[4/5] w-[calc(var(--grid)*8)] | pc:w-fit pc:aspect-auto">
            <ul className="overflow-hidden h-full grid gap-[2rem]">
              <li className="">
                <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
              </li>
              {post.screenshots.map((i, index) => (
                <li key={index}>
                  <Image
                    className="w-full aspect-[4/5] object-contain bg-black px-[--grid] | pc:aspect-auto pc:min-h-[--100vh]"
                    metadata={i}
                  />
                </li>
              ))}
              <li className="h-[--100vh] overflow-hidden">
                <Image className="w-full pc:min-h-[--100vh] pc:object-cover" metadata={post.thumb} />
              </li>
            </ul>
          </div>
        </WorkLayout.Root>
      </div>
    </ContentLayout>
  );
}
