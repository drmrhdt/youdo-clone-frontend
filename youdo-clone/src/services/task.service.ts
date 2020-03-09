import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskResponse } from "../models/TaskResponse.model";
import { TasksPreviewResponse } from "../models/TasksPreviewResponse";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasksPreviewList(): Observable<TasksPreviewResponse> {
    return this.httpClient.get<TasksPreviewResponse>(
      "http://localhost:3000/api/tasks-preview"
    );
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
