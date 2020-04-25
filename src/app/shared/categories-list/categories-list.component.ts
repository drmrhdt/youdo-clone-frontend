import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../../models/Category.model";
import { CategoriesService } from "../../../services/categories.service";
import { defaultPage } from "../../../config/routes";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: string = "";
  defaultPage: number = defaultPage;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  get section() {
    return this.route.snapshot.url[1].path;
  }

  selectCategory(category) {
    if (category.key === this.selectedCategory) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = category.key;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedCategory = params["category"];
    });
    this.categoriesService.categories$.subscribe(
      (value) => (this.categories = value)
    );
  }
}
