import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskPreview } from "../models/TaskPreview.model";
import { TaskResponse } from "../models/TaskResponse.model";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasksPreviewList(): Observable<{
    message: string;
    tasksPreview: TaskPreview[];
  }> {
    return this.httpClient.get<{
      message: string;
      tasksPreview: TaskPreview[];
    }>("http://localhost:3000/api/tasks-preview");
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this.httpClient.get<TaskResponse>(
      `http://localhost:3000/api/task/${id}`
    );
  }

  createTask(formValues) {
    return this.httpClient.post("http://localhost:3000/api/task", formValues);
  }
}
