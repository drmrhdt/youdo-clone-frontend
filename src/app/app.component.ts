import { Component } from "@angular/core";
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
export class AppComponent {
  title: string = "youdo-clone-clone";
  isLoading: boolean = true;
  isAuthenticated: boolean = false;

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
      .subscribe((response: boolean) => (this.isAuthenticated = response));

    this.categoriesService
      .getCategoriesWithSubcategories()
      .subscribe((response: ICategoriesResponse) => {
        this.categoriesService.categories$.next(response.data.categories);
        this.isLoading = false;
      });

    if (this.isAuthenticated) {
      this.userService.getCurrentUserInfo().subscribe((user: IUserResponse) => {
        this.userService.currentUser$.next(user);
      });
    }
  }
}
