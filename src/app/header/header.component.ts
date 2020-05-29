import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { defaultPage } from "../../config/routes";
import { CategoriesService } from "src/services/categories.service";
import { ICategory } from "../../models/ICategory.model";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/services/user.service";
import { IUser } from "src/models/IUser.model";
import { Roles } from "../../guards/role.guard";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  defaultPage: number = defaultPage;
  isShowDropdown: boolean = false;
  isShowDialog: boolean = false;
  isAdminOrModerator: boolean = false;
  isAuthenticated: boolean = false;
  authFormType: string = "";
  modalTitle: string = "";
  id: string = "";

  private _unsubscriber$ = new Subject();

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
    this.categoriesService.categoriesListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ICategory[]) => (this.categories = response));
    this.authService
      .getAuthStatusListener()
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
    if (this.isAuthenticated) {
      // TODO get id from localstorage, and if it's empty then from currentUserListener$
      this.userService.currentUserListener$
        .pipe(takeUntil(this._unsubscriber$))
        .subscribe((response: IUser) => {
          this.id = response._id;
          this.isAdminOrModerator =
            response.moderationInfo.role === Roles.admin ||
            response.moderationInfo.role === Roles.moderator;
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
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
