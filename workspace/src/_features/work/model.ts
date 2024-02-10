import type { Size } from '~/_foundation/type';

type Image = Size & {
  src: string;
};

export type WorkMetadata = {
  id: string;
  eyecatch: Image;
  title: string;
  category: string;
  stacks: string[];
  screenshots: Image[];
  url: string;
  launch: Date;
};
