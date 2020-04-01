import { Task } from "./Task.model";

export interface TaskResponse {
  status: string;
  data: {
    task: Task;
  };
}
