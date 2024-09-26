import dayjs from "dayjs";

export function makeDateOrUndefined(date: Parameters<typeof dayjs>[0]) {
  const day = dayjs(date, "YYYY/MM/DD", true);
  return day.isValid() ? day.toDate() : undefined;
}
