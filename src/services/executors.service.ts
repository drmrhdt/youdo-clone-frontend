import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExecutorsResponse } from "src/models/ExecutorsResponse.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExecutorsService {
  constructor(private httpClient: HttpClient) {}

  getExecutorsList(): Observable<ExecutorsResponse> {
    return this.httpClient.get<ExecutorsResponse>(
      "http://localhost:3000/api/v1/executors"
    );
  }
}
