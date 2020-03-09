import { TaskPreview } from "./TaskPreview.model";

export interface TaskResponse {
  status: string;
  data: {
    task: TaskPreview;
  };
}
