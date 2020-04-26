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
      "http://localhost:3000/api/v1/users/signup",
      { email, password, passwordConfirm }
    );
  }

  signIn({ email, password }): Observable<IAuthSignInResponse> {
    return this.httpClient.post<IAuthSignInResponse>(
      "http://localhost:3000/api/v1/users/login",
      { email, password }
    );
  }
}
