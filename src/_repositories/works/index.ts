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
    launch: rawItem.launch,
    screenshots: rawItem.screenshots.map((i: any) => ({
      height: i.height,
      src: i.url,
      width: i.width,
    })),
    title: rawItem.title,
    url: rawItem.url,
  } as const;
};

const API_ENDPOINT = "https://hayakawasho.microcms.io/api/v1";

export class WorksRepository {
  private constructor(private _apiKey: string) {}

  static create(apiKey: string) {
    try {
      return new WorksRepository(apiKey);
    } catch (error) {
      throw new Error("NO API_KEY", {
        cause: error,
      });
    }
  }

  findList = async (
    q: WorksAPISchema["GET"]["request"]["params"]
  ): Promise<{
    works: WorkMetadata[];
  }> => {
    const { data } = await api.get<WorksAPISchema>(
      `${API_ENDPOINT}/works?${searchParamsToString(q)}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": this._apiKey,
        },
      }
    );

    return {
      works: data.contents.map((item) => {
        return Work.create(convertBookFromDB(item)).toJSON();
      }),
    };
  };
}

export type IWorksRepository = WorksRepository;
