import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskResponse } from "../models/TaskResponse.model";
import { TasksResponse } from "../models/TasksResponse";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasksList(): Observable<TasksResponse> {
    return this.httpClient.get<TasksResponse>(
      "http://localhost:3000/api/tasks"
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
