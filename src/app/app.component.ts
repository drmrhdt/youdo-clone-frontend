import { Component } from "@angular/core";
import { CategoriesService } from "../services/categories.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title: string = "youdo-clone";
  isLoading: boolean = true;

  constructor(private categoriesService: CategoriesService) {
    this.categoriesService
      .getCategoriesWithSubcategories()
      .subscribe((response) => {
        this.categoriesService.categories$.next(response.data.categories);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}
}
