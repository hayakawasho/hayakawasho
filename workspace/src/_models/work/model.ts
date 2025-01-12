import { Entity } from "../";

export type WorkProps = {
  id?: string;
  name?: string;
  eyeCatch?: {
    src: string;
    width: number;
    height: number;
  };
  thumb?: {
    src: string;
    width: number;
    height: number;
  };
  category?: string;
  stacks?: string[];
  screenshots?: {
    src: string;
    width: number;
    height: number;
  }[];
  url?: string;
  launch?: Date;
};

export class Work extends Entity<WorkProps> {
  id = this._value.id ?? null;
  name = this._value.name ?? null;
  eyeCatch = this._value.eyeCatch ?? null;
  thumb = this._value.thumb ?? null;
  category = this._value.category ?? null;
  stacks = this._value.stacks ?? null;
  screenshots = this._value.screenshots ?? null;
  url = this._value.url ?? null;
  launch = this._value.launch ?? null;

  static create(value: WorkProps) {
    return new Work(value);
  }
}
