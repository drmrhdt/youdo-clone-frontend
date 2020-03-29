import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../models/Category.model";
import { CategoriesService } from "../../services/categories.service";
import { Subcategory } from "../../models/Subcategory.model";
import { defaultPage } from "../../config/routes";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategoryId: number | null = 16384;
  state: Object;
  /* TO-DO FIX
     as soon as we click on category or subcategory routerLink
     new component is created and so, subcategories list closes 
     and selectedCategoryId=16384 again
  */

  defaultPage: number = defaultPage;
  @Input() isDisabled = false;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  get section() {
    return this.route.snapshot.url[1].path;
  }

  selectCategory(category) {
    if (category.id === this.selectedCategoryId) {
      console.log("click the same");
      console.log(this.selectedCategoryId, category.id);
      this.selectedCategoryId = null;
      return;
    }
    console.log("click different");
    console.log(this.selectedCategoryId, category.id);
    this.selectedCategoryId = category.id;
    console.log("click different");
    console.log(this.selectedCategoryId, category.id);
  }

  ngOnInit(): void {
    this.categories = this.categoriesService.categories;
    console.log(this.selectedCategoryId);
  }
}
