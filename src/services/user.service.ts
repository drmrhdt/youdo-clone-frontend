import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUser$ = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {}

  getCurrentUserInfo() {
    return this.httpClient.get("http://localhost:3000/api/v1/users/me/info");
  }
}
