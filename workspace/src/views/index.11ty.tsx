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
        header={<Header current="home" />}
        namespace="home"
        seo={
          <Seo
            permalink=""
            prepend={
              <>
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={posts[0].eyecatch.src + IMG_API + '&w=1440'}
                  media={mq.pc}
                  rel="preload"
                />
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={posts[1].eyecatch.src + IMG_API + '&w=1440'}
                  media={mq.pc}
                  rel="preload"
                />
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={posts[0].eyecatch.src + IMG_API + '&w=750'}
                  media={mq.pc}
                  rel="preload"
                />
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={posts[1].eyecatch.src + IMG_API + '&w=750'}
                  media={mq.pc}
                  rel="preload"
                />
              </>
            }
            title=""
          />
        }
      >
        <main className="h-full" data-component="Home">
          <div aria-hidden="true" data-scroll-item />
          <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
          <div css={styles.screen}>
            <ul className="" css={styles.projects} data-ref="projects">
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index} post={post} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

const Thumbnail = ({ post }: { post: WorkMetadata; index: number }) => {
  return (
    <div css={styles.project__eyecatch} data-ref="projectItem">
      <img
        alt=""
        className="w-full h-full invisible"
        data-h={post.eyecatch.height}
        data-ref="plane"
        data-speed={1}
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
