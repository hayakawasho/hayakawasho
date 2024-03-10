import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/index.view";
import { Link } from "../ui/link";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/_components/work/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="">
      <h1 className={`${Styles.h1} sp:sr-only`}>
        <span className={Styles.h1__sub}>Featured</span>
        <span className={Styles.h1__main}>Projects</span>
      </h1>
      <div data-scroll-item className=""></div>
      <div className={`${Styles.grid} items-start sp:!hidden`} data-component="Home">
        <ul className="col-span-9 | list flex flex-wrap gap-x-[1.6rem] pointer-events-auto">
          {posts.map((post, index) => {
            return (
              <li key={post.id} data-ref="project">
                <Link className={`${Styles.entry} hover:opacity-100`} to={`./works/${post.id}/`}>
                  <span className="overflow-hidden inline-block" data-ref="text">
                    {post.title}
                    {index < posts.length - 1 && <span>,</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="col-span-2 col-start-11 pt-[125%] relative">
          <img
            src={posts[0].eyecatch.src}
            alt=""
            className="w-full h-full absolute inset-0 object-cover"
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Component;
