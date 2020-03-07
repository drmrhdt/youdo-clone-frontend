import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskPreview } from "../models/TaskPreview.model";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  getTasksPreviewList(): Observable<{
    message: string;
    tasksPreview: TaskPreview[];
  }> {
    return this.httpClient.get<{
      message: string;
      tasksPreview: TaskPreview[];
    }>("http://localhost:3000/api/tasks-preview");
  }

  constructor(private httpClient: HttpClient) {}
}
