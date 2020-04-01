import { Task } from "./Task.model";

export interface TasksResponse {
  status: "success";
  results: number;
  data: {
    tasks: Task[];
  };
}
