import { Model } from "./model";
import type { Size } from "@/_foundation";

export type WorkMetadata = {
  id: string;
  eyecatch: Size & {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  kinds: string[];
};

export class Work extends Model<WorkMetadata> {
  static create = (data: WorkMetadata) => {
    return new Work(data);
  };
}
