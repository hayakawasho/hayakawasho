import type { Size } from "@/_foundation/type";

type Image = Size & {
  src: string;
};

export type WorkMetadata = {
  id: string;
  eyecatch: {
    src?: string;
    width?: number;
    height?: number;
  };
  title: string;
  category: string;
  stacks: string[];
  screenshots: {
    src?: string;
    width?: number;
    height?: number;
  }[];
  url?: string;
  launch: Date;
};
