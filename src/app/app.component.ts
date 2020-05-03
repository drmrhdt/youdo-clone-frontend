import { Component } from "@angular/core";
import { CategoriesService } from "../services/categories.service";
import { AuthService } from "./services/auth.service";
import { UserService } from "src/services/user.service";

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
      .subscribe((response) => {
        this.categoriesService.categories$.next(response.data.categories);
        this.isLoading = false;
      });

    if (isAuth) {
      this.userService.getCurrentUserInfo().subscribe((user) => {
        this.userService.currentUser$.next(user);
      });
    }
  }
}
