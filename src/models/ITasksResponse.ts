import { ITask } from "./ITask.model";

export interface TasksResponse {
  status: "success";
  results: number;
  data: {
    tasks: ITask[];
  };
}
