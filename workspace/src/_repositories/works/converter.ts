import type { WorksAPISchema } from '../schema';
import type { WorkMetadata } from '~/_features/work/model';

export const convertWorkFromCMS = (
  rawItem: WorksAPISchema['GET']['response']['contents'][0]
): WorkMetadata => {
  return {
    category: rawItem.category[0],
    eyecatch: {
      height: rawItem.eyecatch.height,
      src: rawItem.eyecatch.url,
      width: rawItem.eyecatch.width,
    },
    id: rawItem.id,
    launch: rawItem.launch,
    screenshots: rawItem.screenshots.map(i => ({
      height: i.height,
      src: i.url,
      width: i.width,
    })),
    stacks: rawItem.stacks,
    title: rawItem.title,
    url: rawItem.url,
  } as const;
};
