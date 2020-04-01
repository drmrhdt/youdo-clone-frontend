import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/Category.model";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: "app-dropdown-list",
  templateUrl: "./dropdown-list.component.html",
  styleUrls: ["./dropdown-list.component.scss"]
})
export class DropdownListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categories = this.categoriesService.categories;
  }
}
