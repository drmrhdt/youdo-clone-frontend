import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAuthSignUpResponse } from "src/models/IAuthSignUpResponse.model";
import { IAuthSignInResponse } from "src/models/IAuthSignInRespose";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp({
    email,
    password,
    passwordConfirm,
  }): Observable<IAuthSignUpResponse> {
    return this.httpClient.post<IAuthSignUpResponse>(
      "https://localhost:3000/youdo/api/v1/signUp",
      { email, password, passwordConfirm }
    );
  }

  signIn({ email, password }): Observable<IAuthSignInResponse> {
    return this.httpClient.post<IAuthSignInResponse>(
      "https://localhost:3000/youdo/api/v1/login",
      { email, password }
    );
  }
}
