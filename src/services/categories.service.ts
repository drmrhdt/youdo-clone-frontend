import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category.model";
import { CategoriesResponse } from "../models/CategoriesResponse.model";
import { SubcategoriesResponse } from "../models/SubcategoriesResponse.model";
import { CurrentCategoryAndSubcategoryResponse } from "src/models/CurrentCategoryAndSubcategoryResponse.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  categories$ = new BehaviorSubject<Category[]>(null);

  constructor(private http: HttpClient) {
    this.getCategoriesWithSubcategories();
  }

  getCategoriesWithSubcategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(
      "http://localhost:3000/api/v1/categories"
    );
  }

  getSubcategoriesByCategoryId(
    category: Category
  ): Observable<SubcategoriesResponse> {
    return this.http.get<SubcategoriesResponse>(
      `http://localhost:3000/api/v1/subcategories/${category._id}`
    );
  }

  getCurrentCategoryAndSubcategory(
    category: string,
    subcategory: string
  ): Observable<CurrentCategoryAndSubcategoryResponse> {
    return this.http.get<CurrentCategoryAndSubcategoryResponse>(
      `http://localhost:3000/api/v1/tasks/${category}/${subcategory}`
    );
  }
}
