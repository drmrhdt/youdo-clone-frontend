import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPossibleExecutorSuggestion } from "src/models/IPossibleExecutorSuggestion.model";
import { IResponseSingle } from "../models/IResponseSingle.model";

export interface ISuggestionResponse extends IResponseSingle {
  data: {
    suggestion: IPossibleExecutorSuggestion;
  };
}

@Injectable({
  providedIn: "root",
})
export class SuggestionService {
  constructor(private httpClient: HttpClient) {}

  addNewSuggestion(suggestion): Observable<ISuggestionResponse> {
    return this.httpClient.post<ISuggestionResponse>(
      `http://localhost:3000/api/v1/suggestions`,
      { suggestion }
    );
  }

  getSuggestionByTaskIdAndExecutorId(
    taskId: string,
    executorId: string
  ): Observable<ISuggestionResponse> {
    return this.httpClient.get<ISuggestionResponse>(
      `http://localhost:3000/api/v1/suggestions/${taskId}/${executorId}`
    );
  }
}
