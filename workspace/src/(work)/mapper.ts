import dayjs from "dayjs";
import type { WorkMetadata } from "./model";

export const mapWorkLaunchDatetime = (data: WorkMetadata) => {
  return dayjs(data.launch).format("YYYY-MM-DD");
};

export const mapWorkLaunch = (data: WorkMetadata) => {
  return dayjs(data.launch).format("YYYY");
};

export const mapWorkUrl = (data: WorkMetadata) => {
  return data.url?.replace(/^(https?:\/\/)?(www\.)?|\/$/g, "");
};
