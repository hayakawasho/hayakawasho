import { Entity } from "../";

export type WorkProps = {
  id?: string;
  name?: string;
  theme?: "dark" | "light";
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
  siteUrl?: string;
  launch?: Date;
};

export class Work extends Entity<WorkProps> {
  id = this._value.id ?? null;
  name = this._value.name ?? null;
  theme = this._value.theme ?? null;
  eyeCatch = this._value.eyeCatch ?? null;
  thumb = this._value.thumb ?? null;
  category = this._value.category ?? null;
  stacks = this._value.stacks ?? null;
  screenshots = this._value.screenshots ?? null;
  siteUrl = this._value.siteUrl ?? null;
  launch = this._value.launch ?? null;

  static get modelName() {
    return "Work";
  }

  static create(value: WorkProps) {
    return new Work(value);
  }
}
