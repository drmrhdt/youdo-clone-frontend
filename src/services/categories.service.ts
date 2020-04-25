import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category.model";
import { CategoriesResponse } from "../models/CategoriesResponse.model";
import { SubcategoriesResponse } from "../models/SubcategoriesResponse.model";
import { CurrentCategoryAndSubcategoryResponse } from "src/models/CurrentCategoryAndSubcategoryResponse.model";
import { AsyncSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  categories: Category[];
  categoriesSubject;

  constructor(private http: HttpClient) {
    this.categoriesSubject = new AsyncSubject();
    this.getCategoriesWithSubcategories();
  }

  getCategoriesWithSubcategories(): void {
    this.categoriesSubject.next(
      this.http
        .get<CategoriesResponse>("http://localhost:3000/api/v1/categories")
        .subscribe((res) => {
          this.categories = res.data.categories;
        })
    );

    this.categoriesSubject.complete();
  }

  getSubcategoriesByCategoryId(category): Observable<SubcategoriesResponse> {
    return this.http.get<SubcategoriesResponse>(
      `http://localhost:3000/api/v1/subcategories/${category._id}`
    );
  }

  getCurrentCategoryAndSubcategory(
    category,
    subcategory
  ): Observable<CurrentCategoryAndSubcategoryResponse> {
    return this.http.get<CurrentCategoryAndSubcategoryResponse>(
      `http://localhost:3000/api/v1/tasks/${category}/${subcategory}`
    );
  }
}
