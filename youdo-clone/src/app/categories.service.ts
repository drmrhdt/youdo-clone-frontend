import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "./dropdown-list/category.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  // private categories: Category[] = [];

  getCategories(): Observable<{ message: string; categories: Category[] }> {
    return this.http.get<{ message: string; categories: Category[] }>(
      "http://localhost:3000/api/categories"
    );
  }

  constructor(private http: HttpClient) {}
}
