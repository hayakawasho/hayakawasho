import { Model } from "./model";
import type { Size } from "@/_foundation/type";

export type WorkMetadata = {
  id: string;
  eyecatch: Size & {
    src: string;
  };
  title: string;
  kind: string;
};

export class Work extends Model<WorkMetadata> {
  static create = (data: WorkMetadata) => {
    return new Work(data);
  };
}
