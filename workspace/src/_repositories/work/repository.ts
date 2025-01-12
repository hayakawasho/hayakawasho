import { WorkDataMap } from "../../_models/work/mapper";
import { apiClient } from "../../_utils/api";
import type { WorksAPISchema } from "./schema";

export class WorkRepository {
  constructor(private _apiKey: string) {}

  static create(apiKey?: string) {
    if (!apiKey) {
      throw new Error();
    }

    return new WorkRepository(apiKey);
  }

  async findAll() {
    const res = await apiClient.get<WorksAPISchema["GET"]["response"], WorksAPISchema["GET"]["request"]["params"]>(
      `works`,
      {
        params: {
          limit: 99,
          orders: "-launch",
        },
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": this._apiKey,
        },
      },
    );

    const { totalCount, contents } = await res.json();

    return {
      totalCount,
      works: contents.map(WorkDataMap.toDomain),
    };
  }
}
