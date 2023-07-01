import dotenv from "dotenv";
import { WorksRepository } from "@/_repositories/works";

dotenv.config();

const fetchWorks = async () => {
  const { findList } = WorksRepository.create(process.env.API_KEY!);
  const res = await findList({});

  return {
    index: res.works,
  };
};

module.exports = fetchWorks;
