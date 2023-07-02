import dotenv from "dotenv";
import { WorksRepository } from "@/_repositories/works";

dotenv.config();

const fetchWorks = async () => {
  const { findList } = WorksRepository.create(process.env.API_KEY!);
  const [indexResponse, projectsResponse] = await Promise.all([
    findList({}),
    findList({
      orders: "-launch",
    }),
  ]);

  return {
    index: indexResponse.works,
    projects: projectsResponse.works,
  };
};

module.exports = fetchWorks;
