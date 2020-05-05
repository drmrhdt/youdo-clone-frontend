import { ITask } from "./ITask.model";
import { IResponseMultiple } from "./IResponseMultiple.model";

export interface ITasksResponse extends IResponseMultiple {
  data: {
    tasks: ITask[];
  };
}
