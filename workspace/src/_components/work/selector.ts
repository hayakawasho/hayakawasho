import dayjs from "dayjs";
import type { WorkMetadata } from "./model";

export const selectDatetime = (metadata: WorkMetadata) => {
  return dayjs(metadata.launch).format("YYYY-MM-DD");
};

export const selectLaunch = (metadata: WorkMetadata) => {
  return dayjs(metadata.launch).format("YYYY");
};

export const selectUrl = (metadata: WorkMetadata) => {
  return metadata.url?.replace(/^(https?:\/\/)?(www\.)?|\/$/g, "");
};
