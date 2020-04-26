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

  @ViewChild("createTaskLink") createTaskLink: ElementRef;

  @HostListener("document:click")
  onClick() {
    if (!this.createTaskLink.nativeElement.contains(event.target))
      this.isShowDropdown = false;
  }

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.categories$.subscribe(
      (value) => (this.categories = value)
    );
  }

  showSignUpDialog() {
    this.authFormType = "signUp";
    this.modalTitle = "Регистрация";
    this.isShowDialog = true;
  }

  showSignInDialog() {
    this.authFormType = "signIn";
    this.modalTitle = "Вход";
    this.isShowDialog = true;
  }
}
