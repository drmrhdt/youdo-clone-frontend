import { ITask } from "./ITask.model";

export interface ITaskResponse {
  status: string;
  data: {
    task: ITask;
  };
}
