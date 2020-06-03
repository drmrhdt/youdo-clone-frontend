import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CategoriesService } from "../services/categories.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "src/services/user.service";
import { IUserResponse } from "src/models/IUserResponse.model";
import { ICategoriesResponse } from "src/models/ICategoriesResponse.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  title: string = "youdo-clone";
  isLoading: boolean = true;
  isAuthenticated: boolean = false;

  private _unsubscriber$ = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();

    // TODO we need send token to the server each time when user reloads page
    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: boolean) => {
        this.isAuthenticated = response;
        if (this.isAuthenticated) {
          this.userService
            .getCurrentUserInfo()
            .subscribe((response: IUserResponse) => {
              this.userService.currentUserListener$.next(
                response.data.currentUser
              );
            });
        }
      });

    this.categoriesService
      .getCategoriesWithSubcategories()
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ICategoriesResponse) => {
        this.categoriesService.categoriesListener$.next(
          response.data.categories
        );
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }
}
