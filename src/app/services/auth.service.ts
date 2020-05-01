import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { IAuthSignUpResponse } from "src/models/IAuthSignUpResponse.model";
import { IAuthSignInResponse } from "src/models/IAuthSignInResponse.model";
import { IAuthSignUpRequest } from "../../models/IAuthSignUpRequest.model";
import { IAuthSignInRequest } from "../../models/IAuthSignInRequest.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string = "";
  private authStatusListener$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener$.asObservable();
  }

  signUp(body: IAuthSignUpRequest): void {
    this.httpClient
      .post<IAuthSignUpResponse>(
        "http://localhost:3000/api/v1/users/signup",
        body
      )
      .subscribe((response: IAuthSignUpResponse) => {
        this.token = response.token;
        this.authStatusListener$.next(true);
        this.router.navigateByUrl("/");
      });
  }

  signIn(body: IAuthSignInRequest): void {
    this.httpClient
      .post<IAuthSignInResponse>(
        "http://localhost:3000/api/v1/users/login",
        body
      )
      .subscribe((response: IAuthSignInResponse) => {
        this.token = response.token;
        this.authStatusListener$.next(true);
        this.router.navigateByUrl("/");
      });
  }

  signOut(): void {
    this.token = "";
    this.authStatusListener$.next(false);
    this.router.navigateByUrl("/");
  }
}
