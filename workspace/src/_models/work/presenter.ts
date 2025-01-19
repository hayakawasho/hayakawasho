import { formatDate } from "../../_utils/format";
import type { WorkDTO } from "./dto";

export class WorkPresenter {
  static complete(dto: WorkDTO) {
    return {
      launch: formatDate(dto.launch, "MMM D, YYYY"),
      launchDateTime: formatDate(dto.launch, "YYYY-MM-DD"),
      siteUrl: dto.siteUrl?.replace(/^(https?:\/\/)?(www\.)?|\/$/g, ""),
    };
  }
}
