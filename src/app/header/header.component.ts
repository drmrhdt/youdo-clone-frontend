import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { defaultPage } from "../../config/routes";
import { CategoriesService } from "src/services/categories.service";
import { Category } from "../../models/Category.model";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/services/user.service";
import { IUserResponse } from "src/models/IUserResponse.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isShowDropdown: boolean = false;
  defaultPage: number = defaultPage;
  categories: Category[] = [];
  isShowDialog: boolean = false;
  authFormType: string = "";
  modalTitle: string = "";
  id: string = "";

  isAuthenticated: boolean = false;

  @ViewChild("createTaskLink") createTaskLink: ElementRef;
  @HostListener("document:click")
  onClick(): void {
    if (!this.createTaskLink.nativeElement.contains(event.target))
      this.isShowDropdown = false;
  }

  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe(
      (value) => (this.categories = value)
    );
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
    if (this.isAuthenticated) {
      // TODO get id from localstorage, and if it's empty then from currentUser$
      this.userService.currentUser$.subscribe(
        (response: IUserResponse) => (this.id = response.data.currentUser._id)
      );
    }
  }

  showSignUpDialog(): void {
    this.authFormType = "signUp";
    this.modalTitle = "Регистрация";
    this.isShowDialog = true;
  }

  showSignInDialog(): void {
    this.authFormType = "signIn";
    this.modalTitle = "Вход";
    this.isShowDialog = true;
  }

  onSignOut(): void {
    this.authService.signOut();
  }
}
