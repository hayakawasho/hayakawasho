import { renderToStaticMarkup as r } from 'react-dom/server';
import { mq } from '@/_foundation/const';
import { shuffle } from '@/_foundation/shuffle';
import * as styles from './index.css';
import { Header } from '../_components/layout/header';
import { PageWithHeader } from '../_components/layout/page-with-header';
import { Seo } from '../_components/layout/seo';
import { Link } from '../_components/ui/link';
import type { WorkMetadata } from '@/_work/model';

const PER_PAGE = 10;
const IMG_API = '?auto=compress,format';

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: 'posts',
        data: 'cms.works',
        size: PER_PAGE,
      },
    };
  }

  render(props: any) {
    const posts = shuffle(props.posts as WorkMetadata[]);

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="archives" />}
        namespace="archives"
        seo={
          <Seo
            permalink=""
            prepend={
              <>
                {posts.map(post => (
                  <link
                    as="image"
                    crossOrigin="anonymous"
                    href={post.eyecatch.src + IMG_API + '&w=1440'}
                    key={post.id}
                    media={mq.pc}
                    rel="preload"
                  />
                ))}
                {posts.map(post => (
                  <link
                    as="image"
                    crossOrigin="anonymous"
                    href={post.eyecatch.src + IMG_API + '&w=750'}
                    key={post.id}
                    media={mq.sp}
                    rel="preload"
                  />
                ))}
              </>
            }
            title=""
          />
        }
      >
        <main className="h-full" data-component="Archives">
          <div aria-hidden="true" data-scroll-item />
          <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
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
    <div css={styles.project__eyecatch} data-ref="gridItem">
      <img
        alt=""
        className="w-full h-full invisible"
        data-h={post.eyecatch.height}
        data-ref="plane"
        data-speed={speed}
        data-src={post.eyecatch.src}
        data-w={post.eyecatch.width}
        height={post.eyecatch.height}
        width={post.eyecatch.width}
      />
      <Link className="absolute inset-0 block" data-ref="link" to={`/works/${post.id}/`}>
        <span className="sr-only">{post.title}</span>
      </Link>
    </div>
  );
};

module.exports = Component;
