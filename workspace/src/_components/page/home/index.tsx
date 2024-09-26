import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { zeroPadding } from "~/_foundation/utils";
import WorkSlides from "./01-slides";
import WorkList from "./02-list";
import type { WorkMetadata } from "~/(work)/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  const totalPost = posts.length;

  return (
    <PageLayout header={<Header current="home" />} namespace="">
      <main className="h-full" data-component="Home">
        <h1 className="sr-only">Work</h1>
        <div
          className="fixed z-[2] bottom-[7rem] right-[8rem] text-[1.2rem] tracking-[.04em] mix-blend-difference text-[--color-bg] overflow-hidden
          | dark:text-[--color-text]
          | sp:hidden"
        >
          <span className="inline-block" data-ref="counter">
            <span className="mx-[.5em]" data-ref="now">
              {zeroPadding(1)}
            </span>
            <span className="mx-[.5em] opacity-50">{zeroPadding(totalPost)}</span>
          </span>
        </div>

        <div
          className="fixed z-[2] bottom-[7rem] right-[8rem] text-[1.2rem] mix-blend-difference opacity-50 uppercase text-[--color-bg]
          | invisible
          | dark:text-[--color-text]
          | sp:hidden"
        >
          (Scroll)
        </div>

        <div className="">
          {<WorkSlides posts={posts} />}
          {
            //<WorkList posts={posts} totalPost={totalPost} />
          }
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
