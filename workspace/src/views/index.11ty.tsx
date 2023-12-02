import { renderToStaticMarkup as r } from 'react-dom/server';
import { mq } from '@/_foundation/mq';
import { shuffle } from '@/_foundation/shuffle';
import { Header } from './_components/layout/header';
import { PageWithHeader } from './_components/layout/page-with-header';
import { Seo } from './_components/layout/seo';
import { Link } from './_components/ui/link';
import * as styles from './index.css';
import type { WorkMetadata } from '@/_work/model';

const PER_PAGE = 5;
const IMG_API = '?auto=compress,format';
const VIEW_PROJECTS = 'View projects';

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: 'posts',
        data: 'cms.home',
        size: PER_PAGE,
      },
    };
  }

  render(props: any) {
    const posts = shuffle(props.posts as WorkMetadata[]);

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header />}
        namespace="Home"
        seo={
          <Seo
            permalink=""
            prepend={
              <>
                {posts.map(post => (
                  <link
                    as="image"
                    href={post.eyecatch.src + IMG_API + '&w=1440'}
                    key={post.id}
                    rel="preload"
                    media={mq.pc}
                  />
                ))}
                {posts.map(post => (
                  <link
                    as="image"
                    href={post.eyecatch.src + IMG_API + '&w=750'}
                    key={post.id}
                    rel="preload"
                    media={mq.sp}
                  />
                ))}
              </>
            }
            title=""
          />
        }
      >
        <main className="h-full" data-component="Home">
          <div aria-hidden="true" data-scroll-item />
          <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
          <Link css={styles.toProjects} swap="swap:.95s" to="./works/">
            {[...VIEW_PROJECTS].map(c => (
              <span aria-hidden="true" className="_c" data-ref="char">
                {c}
              </span>
            ))}
            <span className="sr-only">{VIEW_PROJECTS}</span>
          </Link>
          <div css={styles.screen}>
            <ul className="" css={styles.projects} data-ref="grid">
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li aria-hidden="true" css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li aria-hidden="true" css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 2} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li aria-hidden="true" css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 3} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li aria-hidden="true" css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 4} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li aria-hidden="true" css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 5} post={post} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

const Thumbnail = ({ post, index }: { post: WorkMetadata; index: number }) => {
  const speed = {
    0: 0.8,
    1: 1,
    2: 0.8,
  }[index % 3];

  return (
    <figure css={styles.project__eyecatch} data-ref="gridItem">
      <img
        alt={post.title}
        className="w-full h-full invisible"
        data-h={post.eyecatch.height}
        data-ref="plane"
        data-speed={speed}
        data-src={post.eyecatch.src}
        data-w={post.eyecatch.width}
        height={post.eyecatch.height}
        width={post.eyecatch.width}
      />
    </figure>
  );
};

module.exports = Component;
