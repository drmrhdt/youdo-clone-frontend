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

export enum Roles {
  user = "user",
  moderator = "moderator",
  admin = "admin",
}

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  signedInUserRole: string;

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.currentUserListener$.subscribe((response: IUser) => {
      this.signedInUserRole = response.moderationInfo.role;
    });

    const isAdminOrModerator =
      this.signedInUserRole === Roles.admin ||
      this.signedInUserRole === Roles.moderator;

    if (!isAdminOrModerator) {
      this.router.navigateByUrl("/");
    }

    return isAdminOrModerator;
  }
}
