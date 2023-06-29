import { apiClient, searchParamsToString } from "@/_foundation";
import { Work, type WorkMetadata } from "@/_work/model";
import type { WorksAPISchema } from "../schema";

const convertBookFromDB = (rawItem: any): WorkMetadata => {
  return {
    eyecatch: {
      height: 0,
      src: rawItem.eyecatch.url,
      width: 0,
    },
    id: rawItem.id,
    title: rawItem.title,
  } as const;
};

export class WorksRepository {
  constructor(private _apiKey: string, private _endpoint: string) {}

  findList = async (
    q: WorksAPISchema["GET"]["request"]["params"]
  ): Promise<{
    works: WorkMetadata[];
    totalCount: number;
  }> => {
    const { data } = await apiClient.get<WorksAPISchema>(
      `${this._endpoint}/books?${searchParamsToString(q)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": this._apiKey,
        },
      }
    );

    return {
      totalCount: data.totalCount,
      works: data.contents.map((item) => {
        return Work.create(convertBookFromDB(item)).toJSON();
      }),
    };
  };
}

export type IWorksRepository = WorksRepository;
