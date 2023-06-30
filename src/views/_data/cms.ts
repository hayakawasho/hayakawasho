import dotenv from "dotenv";
import { WorksRepository } from "@/_repositories/works";

dotenv.config();

const fetchWorks = async () => {
  const repo = new WorksRepository(
    process.env.API_KEY!,
    process.env.API_ENDPOINT!
  );
  const res = await repo.findList({});

  return {
    home: res.works,
  };
};

module.exports = fetchWorks;
