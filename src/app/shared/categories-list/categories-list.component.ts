import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ICategory } from "../../../models/ICategory.model";
import { CategoriesService } from "../../../services/categories.service";
import { defaultPage } from "../../../config/routes";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  categories: ICategory[] = [];
  selectedCategory: string = "";
  defaultPage: number = defaultPage;

  private _unsubscriber$ = new Subject();

  get section(): string {
    return this.route.snapshot.url[1].path;
  }

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((params) => (this.selectedCategory = params["category"]));

    this.categoriesService.categoriesListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: ICategory[]) => {
        this.categories = response;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }

  selectCategory(category): void {
    if (category.key === this.selectedCategory) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = category.key;
  }
}
