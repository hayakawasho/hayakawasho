import type { WorkDTO } from "../../../_models/work/dto";

export function Header({
  allPosts,
  current,
}: {
  allPosts: WorkDTO[];
  current: string;
}) {
  return <header></header>;
}
