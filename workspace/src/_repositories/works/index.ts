import axios from 'redaxios';
import { convertWorkFromCMS } from './converter';
import type { WorksAPISchema } from '../schema';
import type { WorkMetadata } from '~/_features/work/model';

const API_ENDPOINT = 'https://hayakawasho.microcms.io/api/v1';

export const createWorksRepository = (apiKey: string) => ({
  findList: async (
    q: WorksAPISchema['GET']['request']['params']
  ): Promise<{
    works: WorkMetadata[];
    totalCount: number;
  }> => {
    const res = await axios.get<WorksAPISchema['GET']['response']>(`${API_ENDPOINT}/works`, {
      params: {
        ...q,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-MICROCMS-API-KEY': apiKey,
      },
    });

    return {
      totalCount: res.data.totalCount,
      works: res.data.contents.map(convertWorkFromCMS),
    };
  },
});
