import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/Category.model";
import { Observable, AsyncSubject } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

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
        .get<{ message: string; categories: Category[] }>(
          "http://localhost:3000/api/categories"
        )
        .subscribe(res => {
          this.categories = res.categories;
        })
    );

    this.categoriesSubject.complete();
  }
}
