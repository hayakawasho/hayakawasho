import { api } from '@/_foundation/api';
import { searchParamsToString } from '@/_foundation/utils';
import { Work } from '@/_work/model';
import type { WorksAPISchema } from '../schema';
import type { WorkMetadata } from '@/_work/model';

const convertWorkFromCMS = (rawItem: any): WorkMetadata => {
  return {
    category: rawItem.category[0],
    eyecatch: {
      height: rawItem.eyecatch.height,
      src: rawItem.eyecatch.url,
      width: rawItem.eyecatch.width,
    },
    id: rawItem.id,
    launch: rawItem.launch,
    screenshots: rawItem.screenshots.map((i: any) => ({
      height: i.height,
      src: i.url,
      width: i.width,
    })),
    stacks: rawItem.stacks,
    title: rawItem.title,
    url: rawItem.url,
  } as const;
};

const API_ENDPOINT = 'https://hayakawasho.microcms.io/api/v1';

export class WorksRepository {
  private constructor(private _apiKey: string) {}

  static create(apiKey: string) {
    try {
      return new WorksRepository(apiKey);
    } catch (error) {
      throw new Error('NO API_KEY', {
        cause: error,
      });
    }
  }

  findList = async (
    q: WorksAPISchema['GET']['request']['params']
  ): Promise<{
    works: WorkMetadata[];
    totalCount: number;
  }> => {
    const { data } = await api.get<WorksAPISchema>(
      `${API_ENDPOINT}/works?${searchParamsToString(q)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-MICROCMS-API-KEY': this._apiKey,
        },
      }
    );

    return {
      totalCount: data.totalCount,
      works: data.contents.map(item => {
        return Work.create(convertWorkFromCMS(item)).toJSON();
      }),
    };
  };
}

export type IWorksRepository = WorksRepository;
