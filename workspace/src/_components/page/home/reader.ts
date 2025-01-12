import { WorkDataMap } from "../../../_models/work/mapper";
import type { IWorkRepository } from "../../../_repositories/work/repository";

export class WorkIndexUseCase {
  constructor(private _repository: IWorkRepository) {}

  async execute() {
    const result = await this._repository.findAll();

    return {
      posts: result.works.map(WorkDataMap.toDTO),
      totalCount: result.totalCount,
    };
  }
}
