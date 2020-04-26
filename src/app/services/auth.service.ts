import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IAuthSignUpResponse } from "src/models/IAuthSignUpResponse.model";
import { IAuthSignInResponse } from "src/models/IAuthSignInRespose";
import { IAuthSignUpRequest } from "../../models/IAuthSignUpRequest";
import { IAuthSignInRequest } from "../../models/IAuthSignInRequest";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(body: IAuthSignUpRequest): Observable<IAuthSignUpResponse> {
    return this.httpClient.post<IAuthSignUpResponse>(
      "http://localhost:3000/api/v1/users/signup",
      body
    );
  }

  signIn(body: IAuthSignInRequest): Observable<IAuthSignInResponse> {
    return this.httpClient.post<IAuthSignInResponse>(
      "http://localhost:3000/api/v1/users/login",
      body
    );
  }
}
