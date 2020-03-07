import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  getTasksPreviewList(): Observable<{ message: string; tasksPreview: [] }> {
    return this.httpClient.get<{ message: string; tasksPreview: [] }>(
      "http://localhost:3000/api/tasks-preview"
    );
  }

  constructor(private httpClient: HttpClient) {}
}
