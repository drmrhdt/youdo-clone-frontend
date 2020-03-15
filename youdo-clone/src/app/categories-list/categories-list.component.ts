import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/Category.model";
import { CategoriesService } from "../../services/categories.service";
import { Subcategory } from "../../models/Subcategory.model";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategoryId: number;

  constructor(private categoriesService: CategoriesService) {}

  selectCategory(category) {
    if (category.id === this.selectedCategoryId) {
      this.selectedCategoryId = null;
      return;
    }
    this.selectedCategoryId = category.id;
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.categories;
  }
}
