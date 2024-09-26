import type { Image } from "~/_foundation/models";

export type WorkMetadata = {
  id: string;
  mv: Image;
  thumbnail: Image;
  title: string;
  category: string;
  stacks: string[];
  screenshots: Image[];
  url?: string;
  launch: Date;
};
