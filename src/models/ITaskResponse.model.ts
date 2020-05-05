import { ITask } from "./ITask.model";
import { IResponseSingle } from "./IResponseSingle.model";

export interface ITaskResponse extends IResponseSingle {
  data: {
    task: ITask;
  };
}
