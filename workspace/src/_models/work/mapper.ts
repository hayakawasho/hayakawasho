import type { WorkDTO } from "./dto";
// import dayjs from "dayjs";
import { Work } from "./model";

export class WorkDataMap {
  static toDomain(raw: any): Work {
    return Work.create({
      theme: raw.is_dark ? "dark" : "light",
      category: raw.category[0],
      eyeCatch: {
        src: raw.eyecatch.url,
        width: raw.eyecatch.width,
        height: raw.eyecatch.height,
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
      id: data.id,
      name: data.name,
      eyeCatch: data.eyeCatch,
      theme: data.theme,
      thumb: data.thumb,
      category: data.category,
      stacks: data.stacks,
      screenshots: data.screenshots,
      siteUrl: data.siteUrl,
      launch: data.launch,
    } as WorkDTO;
  }
}
