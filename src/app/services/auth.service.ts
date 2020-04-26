import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAuthSignUpResponse } from "src/models/IAuthSignUpResponse.model";
import { IAuthSignInResponse } from "src/models/IAuthSignInResponse.model";
import { IAuthSignUpRequest } from "../../models/IAuthSignUpRequest.model";
import { IAuthSignInRequest } from "../../models/IAuthSignInRequest.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string = "";

  constructor(private httpClient: HttpClient) {}

  getToken(): string {
    return this.token;
  }

  signUp(body: IAuthSignUpRequest): void {
    this.httpClient
      .post<IAuthSignUpResponse>(
        "http://localhost:3000/api/v1/users/signup",
        body
      )
      .subscribe(
        (response: IAuthSignUpResponse) => (this.token = response.token)
      );
  }

  signIn(body: IAuthSignInRequest): void {
    this.httpClient
      .post<IAuthSignInResponse>(
        "http://localhost:3000/api/v1/users/login",
        body
      )
      .subscribe(
        (response: IAuthSignInResponse) => (this.token = response.token)
      );
  }
}
