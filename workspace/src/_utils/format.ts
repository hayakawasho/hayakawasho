import { default as dayjs } from "dayjs";

export const formatDate = (date: number | Date, format: string) => dayjs(date).format(format);
