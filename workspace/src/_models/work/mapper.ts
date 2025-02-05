import type { WorkDTO } from "./dto";
// import dayjs from "dayjs";
import { Work } from "./model";

export class WorkDataMap {
  static toDomain(raw: any): Work {
    return Work.create({
      category: raw.category[0],
      eyeCatch: {
        height: raw.eyecatch.height,
        src: raw.eyecatch.url,
        width: raw.eyecatch.width,
      },
      thumb: {
        height: raw.thumbnail.height,
        src: raw.thumbnail.url,
        width: raw.thumbnail.width,
      },
      id: raw.id,
      launch: raw.launch,
      screenshots:
        raw.screenshots?.map((i: any) => ({
          height: i.height,
          src: i.url,
          width: i.width,
        })) ?? [],
      stacks: raw.stacks,
      name: raw.title,
      siteUrl: raw.url,
    });
  }

  static toDTO(data: Work): WorkDTO {
    return {
      id: data.id!,
      name: data.name!,
      eyeCatch: data.eyeCatch!,
      thumb: data.thumb!,
      category: data.category!,
      stacks: data.stacks!,
      screenshots: data.screenshots!,
      siteUrl: data.siteUrl!,
      launch: data.launch!,
    };
  }
}
