import { api } from "@/_foundation/api";
import { searchParamsToString } from "@/_foundation/utils";
import { Work } from "@/_work/model";
import type { WorksAPISchema } from "../schema";
import type { WorkMetadata } from "@/_work/model";

const convertBookFromDB = (rawItem: any): WorkMetadata => {
  return {
    eyecatch: {
      height: rawItem.eyecatch.height,
      src: rawItem.eyecatch.url,
      width: rawItem.eyecatch.width,
    },
    id: rawItem.id,
    kind: rawItem.kinds[0],
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
    const { data } = await api.get<WorksAPISchema>(
      `${this._endpoint}/works?${searchParamsToString(q)}`,
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
