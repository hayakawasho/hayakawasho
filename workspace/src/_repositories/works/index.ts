import axios from "redaxios";
import { convertWorkFromCMS } from "./converter";
import type { WorksAPISchema } from "../schema";
import type { WorkMetadata } from "~/(work)/model";

class WorkRepository {
  constructor(private _apiKey: string) {}

  findList = async (
    q: WorksAPISchema["GET"]["request"]["params"],
  ): Promise<{
    works: WorkMetadata[];
    totalCount: number;
  }> => {
    const res = await axios<WorksAPISchema["GET"]["response"]>({
      url: `https://hayakawasho.microcms.io/api/v1/works`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": this._apiKey,
      },
      params: {
        ...q,
      },
    });

    return {
      totalCount: res.data.totalCount,
      works: res.data.contents.map(convertWorkFromCMS),
    };
  };
}

export const createWorkRepository = (apiKey = "") => {
  if (!apiKey) {
    throw new Error("apiKey is null");
  }

  return new WorkRepository(apiKey);
};
