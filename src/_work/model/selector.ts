import dayjs from "dayjs";
import type { WorkMetadata } from ".";

export const selectDatetime = (metadata: WorkMetadata) => {
  return dayjs(metadata.launch).format("YYYY-MM-DD");
};

export const selectLaunch = (metadata: WorkMetadata) => {
  return dayjs(metadata.launch).format("MMMM YYYY");
};

export const selectUrl = (metadata: WorkMetadata) => {
  return metadata.url.replace(/^(https?:\/\/)?(www\.)?|\/$/g, "");
};

export const selectStacks = (metadata: WorkMetadata) => {
  const stacks = metadata.stacks;
  stacks.unshift(metadata.kind);

  return stacks.join(", ");
};
