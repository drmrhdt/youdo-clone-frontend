import { Injectable, OnDestroy } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, OnDestroy {
  isAuthenticated: boolean = false;

  private _unsubscriber$ = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: boolean) => (this.isAuthenticated = response));

    if (!this.isAuthenticated) {
      this.router.navigateByUrl("/");
    }

    return this.isAuthenticated;
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }
}
