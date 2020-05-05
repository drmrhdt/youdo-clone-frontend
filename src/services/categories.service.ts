import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICategory } from "../models/ICategory.model";
import { ICategoriesResponse } from "../models/ICategoriesResponse.model";
import { ISubcategoriesResponse } from "../models/ISubcategoriesResponse.model";
import { ICurrentCategoryAndSubcategoryResponse } from "src/models/ICurrentCategoryAndSubcategoryResponse.model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  categories$ = new BehaviorSubject<ICategory[]>(null);

  constructor(private http: HttpClient) {
    this.getCategoriesWithSubcategories();
  }

  getCategoriesWithSubcategories(): Observable<ICategoriesResponse> {
    return this.http.get<ICategoriesResponse>(
      "http://localhost:3000/api/v1/categories"
    );
  }

  getSubcategoriesByCategoryId(
    category: ICategory
  ): Observable<ISubcategoriesResponse> {
    return this.http.get<ISubcategoriesResponse>(
      `http://localhost:3000/api/v1/subcategories/${category._id}`
    );
  }

  getCurrentCategoryAndSubcategory(
    category: string,
    subcategory: string
  ): Observable<ICurrentCategoryAndSubcategoryResponse> {
    return this.http.get<ICurrentCategoryAndSubcategoryResponse>(
      `http://localhost:3000/api/v1/tasks/${category}/${subcategory}`
    );
  }
}
