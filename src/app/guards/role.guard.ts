import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/services/user.service";
import { IUser } from "src/models/IUser.model";
import { IUserResponse } from "src/models/IUserResponse.model";

export enum Roles {
  user = "user",
  moderator = "moderator",
  admin = "admin",
}

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  signedInUser: IUser;

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.currentUserListener$.subscribe(
      (response: IUserResponse) => {
        this.signedInUser = response.data.currentUser;
      }
    );

    const role = "admin";
    const isAdminOrModerator = role === Roles.admin || role == Roles.moderator;

    if (!isAdminOrModerator) {
      this.router.navigateByUrl("/");
    }

    return isAdminOrModerator;
  }
}
