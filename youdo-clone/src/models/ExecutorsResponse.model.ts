import { Executor } from "./Executor.model";

export interface ExecutorsResponse {
  status: string;
  results: number;
  data: {
    executors: Executor[];
  };
}
