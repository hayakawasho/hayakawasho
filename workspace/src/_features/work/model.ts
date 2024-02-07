import { Model } from '~/_foundation/model';
import type { Size } from '~/_foundation/type';

type Image = {
  src: string;
} & Size;

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

export class Work extends Model<WorkMetadata> {
  static create = (data: WorkMetadata) => {
    return new Work(data);
  };
}
