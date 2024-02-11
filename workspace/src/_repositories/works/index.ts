import axios from "redaxios";
import { convertWorkFromCMS } from "./converter";
import type { WorksAPISchema } from "../schema";
import type { WorkMetadata } from "~/_features/work/model";

export const createWorksRepository = (apiKey: string) => ({
  findList: async (
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
        "X-MICROCMS-API-KEY": apiKey,
      },
      params: {
        ...q,
      },
    });

    return {
      totalCount: res.data.totalCount,
      works: res.data.contents.map(convertWorkFromCMS),
    };
  },
});
