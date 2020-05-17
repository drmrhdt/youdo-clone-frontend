import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITaskResponse } from "../models/ITaskResponse.model";
import { ITasksResponse } from "../models/ITasksResponse";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTasksList(): Observable<ITasksResponse> {
    return this.httpClient.get<ITasksResponse>(
      "http://localhost:3000/api/v1/tasks"
    );
  }

  getTaskById(id: string): Observable<ITaskResponse> {
    return this.httpClient.get<ITaskResponse>(
      `http://localhost:3000/api/v1/tasks/${id}`
    );
  }

  getTasksListByFilter(filter, value): Observable<ITasksResponse> {
    return this.httpClient.get<ITasksResponse>(
      `http://localhost:3000/api/v1/tasks?${filter}=${value}`
    );
  }

  createTask(formValues) {
    return this.httpClient.post(
      "http://localhost:3000/api/v1/tasks",
      formValues
    );
  }
  // for editing task
  updateTask(id, body): Observable<ITaskResponse> {
    return this.httpClient.patch<ITaskResponse>(
      "http://localhost:3000/api/v1/tasks",
      { id, body }
    );
  }
}
