import dotenv from "dotenv";
import { WorksRepository } from "@/_repositories/works";

dotenv.config();

const fetchWorks = async () => {
  const repository = WorksRepository.create(process.env.API_KEY!);

  const res = await Promise.all([
    repository.findList({}),
    repository.findList({
      limit: 99,
      orders: "-launch",
    }),
  ]);

  return {
    home: res[0].works,
    works: res[1].works,
    totalCount: res[1].totalCount,
  };
};

module.exports = fetchWorks;
