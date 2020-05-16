import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IUsersResponse } from "src/models/IUsersResponse.model";
import { IUserResponse } from "src/models/IUserResponse.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUserListener$ = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {}

  getCurrentUserInfo(): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(
      "http://localhost:3000/api/v1/users/me/info"
    );
  }

  getUserInfoById(id: string) {
    return this.httpClient.get<IUserResponse>(
      `http://localhost:3000/api/v1/users/${id}`
    );
  }

  getUsersByFilter(filter: string, value: any): Observable<IUsersResponse> {
    return this.httpClient.get<IUsersResponse>(
      `http://localhost:3000/api/v1/users?${filter}=${value}`
    );
  }

  updateMe(body): Observable<IUserResponse> {
    return this.httpClient.patch<IUserResponse>(
      `http://localhost:3000/api/v1/users/updateMe`,
      body
    );
  }
}
