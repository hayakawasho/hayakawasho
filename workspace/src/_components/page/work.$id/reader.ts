import { WorkDataMap } from "../../../_models/work/mapper";
import type { IWorkRepository } from "../../../_repositories/work/repository";

export class WorkItemUseCase {
  constructor(private _repository: IWorkRepository) {}

  async execute() {
    const result = await this._repository.findAll();

    const workItems = result.works.map(WorkDataMap.toDTO);
    const last = workItems[workItems.length - 1];

    return workItems.map((item, index) => ({
      params: {
        id: item.id!,
      },
      props: {
        post: item,
        next: last.id === item.id ? workItems[0] : workItems[index + 1],
        totalCount: result.totalCount,
        currentIndex: index + 1,
      },
    }));
  }
}
