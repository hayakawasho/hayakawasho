import { apiClient } from "../../_libs/api";
import { WorkDataMap } from "../../_models/work/mapper";
import type { WorksAPISchema } from "./schema";

export class WorkRepository {
  constructor() {}

  async findAll() {
    const res = await apiClient.get<WorksAPISchema["GET"]["response"], WorksAPISchema["GET"]["request"]["params"]>(
      `works`,
      {
        params: {
          limit: 99,
          orders: "-launch",
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

export type IWorkRepository = WorkRepository;
