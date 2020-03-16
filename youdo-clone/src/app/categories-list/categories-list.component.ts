import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  all: string = "all";
  defaultPage: number = 1;
  section: string = "tasks";
  @Input() isDisabled = false;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  selectCategory(category) {
    if (category.id === this.selectedCategoryId) {
      this.selectedCategoryId = null;
      return;
    }
    this.selectedCategoryId = category.id;
  }

  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.categories = this.categoriesService.categories;
  }
}
