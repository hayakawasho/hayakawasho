import { mapWorkLaunchDatetime, mapWorkLaunch, mapWorkUrl } from "~/(work)/mapper";
import { WorkBack } from "~/_components/model/work/work-back";
import { WorkInfo } from "~/_components/model/work/work-info";
import { WorkKv } from "~/_components/model/work/work-kv";
import { WorkNext } from "~/_components/model/work/work-next";
import { WorkScreenshots } from "~/_components/model/work/work-screenshots";
import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/(work)/model";

const Component: React.FC<{
  post: WorkMetadata;
  nextPost: WorkMetadata;
  now: number;
  max: number;
}> = ({ post, nextPost, now, max }) => {
  return (
    <PageLayout header={<Header current="work-single" />} namespace="work-single">
      <main data-component="WorkSingle">
        <WorkBack />
        <div className="mb-[8rem] pc:mb-[16rem]">
          <div className={Styles.intro}>
            <div className={Styles.intro__indexNumber}>
              <span className="inline-block tracking-[-0.02em]" data-ref="now">
                {zeroPadding(now)}
              </span>
              <span className="relative inline-block mx-[.5em]" data-ref="dash">
                ー
              </span>
              <span className="inline-block  tracking-[-0.02em]" data-ref="max">
                {zeroPadding(max)}
              </span>
            </div>
            <div className={Styles.intro__g}>
              <div className={Styles.intro__hgroup}>
                <div className={Styles.heading}>
                  <h1 className="overflow-hidden" data-ref="h1">
                    {post.title}
                  </h1>
                  <time className={Styles.heading__date} dateTime={mapWorkLaunchDatetime(post)}>
                    <span className="inline-block" data-ref="date">
                      ({mapWorkLaunch(post)})
                    </span>
                  </time>
                </div>
              </div>

              <div className={Styles.intro__info}>
                <div className={Styles.info}>
                  <WorkInfo label="(Category)">{post.category}</WorkInfo>
                  {post.url && (
                    <WorkInfo label="(Url)">
                      <a href={post.url} target="_blank">
                        {mapWorkUrl(post)} <span className="text-[90%]">↗</span>
                      </a>
                    </WorkInfo>
                  )}
                </div>
                {post.stacks.length > 0 && (
                  <dl className={Styles.stacks}>
                    <dt className="sr-only">(Stacks)</dt>
                    <dd>
                      <ul className={Styles.stacksItems}>
                        {post.stacks.map((stack, i) => (
                          <li className="overflow-hidden" key={i}>
                            <span className="inline-block" data-ref="stack">
                              {stack}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <hr className={Styles.stacks__hr} data-ref="infoLine" />
                    </dd>
                  </dl>
                )}
              </div>
            </div>
          </div>
          <WorkKv img={post.mv} />
        </div>
        <div className="mb-[16rem]">
          {post.screenshots && <WorkScreenshots screenshots={post.screenshots} className="mb-[5rem]" />}
        </div>
        <WorkNext nextPost={nextPost} />
      </main>
    </PageLayout>
  );
};

export default Component;
