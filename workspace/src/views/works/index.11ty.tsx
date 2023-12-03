import { renderToStaticMarkup as r } from 'react-dom/server';
import * as styles from './index.css';
import { Header } from '../_components/layout/header';
import { PageWithHeader } from '../_components/layout/page-with-header';
import { Seo } from '../_components/layout/seo';
import { Link } from '../_components/ui/link';
import { ResponsiveImage } from '../_components/ui/responsive-image';
import type { WorkMetadata } from '@/_work/model';

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: false,
        alias: 'posts',
        data: 'cms.works',
        size: 99,
      },
    };
  }

  render(props: any) {
    const posts = props.posts as WorkMetadata[];

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="works" />}
        namespace="works"
        seo={<Seo permalink="/works/" title="Works" />}
      >
        <main className="h-full" data-component="Works">
          <div aria-hidden="true" data-scroll-item />
          <h1 className="sr-only">Works</h1>
          <div css={styles.screen}>
            <ul css={styles.list} data-ref="items">
              {posts.map(post => (
                <Item key={post.id} post={post} />
              ))}
              {posts.map(post => (
                <Item aria-hidden="true" key={post.id} post={post} />
              ))}
            </ul>
          </div>
        </main>
      </PageWithHeader>
    )}`;
  }
}

const IMG_API = '?auto=compress,format';
const IMG_API_CROPPED = IMG_API + '&fit=crop&w=100&h=100';

const Item = ({ post, ...props }: { post: WorkMetadata }) => {
  return (
    <li
      {...props}
      data-image={post.eyecatch.src + IMG_API + '&w=1440'}
      data-image-size={`[${post.eyecatch.width}, ${post.eyecatch.height}]`}
      data-ref="item"
    >
      <Link css={styles.item} to={`./${post.id}/`}>
        <div className="pc:hidden" css={styles.item__thumb}>
          <ResponsiveImage
            alt=""
            className="w-full h-full rounded-1/2"
            data-ref="img"
            pcSize={[1, 1]}
            pcSrc="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
            spSize={[100, 100]}
            spSrc={post.eyecatch.src + IMG_API_CROPPED}
          />
        </div>
        <h2 className="pl-[0.05em]" css={styles.item__title} data-ref="text">
          {post.title}
        </h2>
      </Link>
    </li>
  );
};

module.exports = Component;
