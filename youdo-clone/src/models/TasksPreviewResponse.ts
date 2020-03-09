import { TaskPreview } from "./TaskPreview.model";

export interface TasksPreviewResponse {
  status: "success";
  results: number;
  data: {
    tasksPreview: TaskPreview[];
  };
}
