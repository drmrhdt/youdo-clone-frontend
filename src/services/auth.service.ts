import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IAuthSignUpResponse } from "src/models/IAuthSignUpResponse.model";
import { IAuthSignInResponse } from "src/models/IAuthSignInResponse.model";
import { IAuthSignUpRequest } from "../models/IAuthSignUpRequest.model";
import { IAuthSignInRequest } from "../models/IAuthSignInRequest.model";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  private token: string = "";

  private authStatusListener$ = new BehaviorSubject<boolean>(false);

  private _unsubscriber$ = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }

  getToken(): string {
    return this.token || localStorage.getItem("token");
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener$.asObservable();
  }

  signUp(body: IAuthSignUpRequest): void {
    this.httpClient
      .post<IAuthSignUpResponse>(
        "http://localhost:3000/api/v1/users/signup",
        body
      )
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: IAuthSignUpResponse) => {
        this.token = response.token;
        this.authStatusListener$.next(true);
        this.router.navigateByUrl("/");
        this.saveAuthData(this.token);
      });
  }

  signIn(body: IAuthSignInRequest): void {
    this.httpClient
      .post<IAuthSignInResponse>(
        "http://localhost:3000/api/v1/users/login",
        body
      )
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: IAuthSignInResponse) => {
        this.token = response.token;
        this.authStatusListener$.next(true);
        this.router.navigateByUrl("/");
        this.saveAuthData(this.token);
      });
  }

  signOut(): void {
    this.token = "";
    this.authStatusListener$.next(false);
    this.router.navigateByUrl("/");
    this.clearAuthData();
  }

  autoAuthUser(): void {
    const token = this.getAuthData();

    if (token) {
      this.authStatusListener$.next(true);
    }
  }

  private saveAuthData(token: string): void {
    localStorage.setItem("token", token);
  }

  private clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("signedInUser");
  }

  private getAuthData(): string {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    return token;
  }
}
