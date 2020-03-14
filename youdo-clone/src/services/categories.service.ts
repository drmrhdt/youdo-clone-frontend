import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category.model";
import { CategoriesResponse } from "../models/CategoriesResponse.model";
import { SubcategoriesResponse } from "../models/SubcategoriesResponse.model";
import { AsyncSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  categories: Category[];
  categoriesSubject;

  constructor(private http: HttpClient) {
    this.categoriesSubject = new AsyncSubject();
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesSubject.next(
      this.http
        .get<CategoriesResponse>("http://localhost:3000/api/categories")
        .subscribe(res => {
          this.categories = res.data.categories;
          this.categories.forEach(category => {
            this.http
              .get<SubcategoriesResponse>(
                `http://localhost:3000/api/subcategories/${category.id}`
              )
              .subscribe(response => {
                category.subcategories = response.data.subcategories;
              });
          });
        })
    );

    this.categoriesSubject.complete();
  }
}
