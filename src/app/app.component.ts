import { Component } from "@angular/core";
import { CategoriesService } from "../services/categories.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "src/services/user.service";
import { IUserResponse } from "src/models/IUserResponse.model";
import { CategoriesResponse } from "src/models/CategoriesResponse.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title: string = "youdo-clone";
  isLoading: boolean = true;

  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    const isAuth = this.authService.getAuthStatus();

    this.categoriesService
      .getCategoriesWithSubcategories()
      .subscribe((response: CategoriesResponse) => {
        this.categoriesService.categories$.next(response.data.categories);
        this.isLoading = false;
      });

    if (isAuth) {
      this.userService.getCurrentUserInfo().subscribe((user: IUserResponse) => {
        this.userService.currentUser$.next(user);
      });
    }
  }
}
