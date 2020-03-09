import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category.model";
import { CategoriesResponse } from "../models/CategoriesResponse.model";
import { AsyncSubject } from "rxjs";

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

  getCategories() {
    this.categoriesSubject.next(
      this.http
        .get<CategoriesResponse>("http://localhost:3000/api/categories")
        .subscribe(res => {
          this.categories = res.data.categories;
        })
    );

    this.categoriesSubject.complete();
  }
}
