import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  getTasksPreviewList() {
    return this.httpClient.get("/tasks-preview");
  }

  constructor(private httpClient: HttpClient) {}
}
