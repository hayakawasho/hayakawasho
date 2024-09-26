import type { WorksAPISchema } from "../schema";
import type { WorkMetadata } from "~/(work)/model";

const rawImageToImageMetadata = (raw: WorksAPISchema["GET"]["response"]["contents"][0]["eyecatch"]) => {
  return {
    height: raw.height,
    src: raw.url,
    width: raw.width,
  };
};

export const convertWorkFromCMS = (rawItem: WorksAPISchema["GET"]["response"]["contents"][0]): WorkMetadata => {
  return {
    category: rawItem.category[0],
    mv: rawImageToImageMetadata(rawItem.eyecatch),
    thumbnail: rawImageToImageMetadata(rawItem.thumbnail ?? {}),
    id: rawItem.id,
    launch: rawItem.launch,
    screenshots: rawItem.screenshots?.map(rawImageToImageMetadata) ?? [],
    stacks: rawItem.stacks,
    title: rawItem.title,
    url: rawItem.url,
  } as const;
};
