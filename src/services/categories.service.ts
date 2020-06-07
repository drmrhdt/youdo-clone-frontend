import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, BehaviorSubject } from 'rxjs'

import { baseUrl } from 'src/environments'

import {
	ICategory,
	ICategoriesResponse,
	ICurrentCategoryAndSubcategoryResponse,
	ISubcategoriesResponse
} from 'src/models'

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	categoriesListener$ = new BehaviorSubject<ICategory[]>(null)

	constructor(private http: HttpClient) {
		this.getCategoriesWithSubcategories()
	}

	getCategoriesWithSubcategories(): Observable<ICategoriesResponse> {
		return this.http.get<ICategoriesResponse>(`${baseUrl}/categories`)
	}

	getSubcategoriesByCategoryId(
		category: ICategory
	): Observable<ISubcategoriesResponse> {
		return this.http.get<ISubcategoriesResponse>(
			`${baseUrl}/subcategories/${category._id}`
		)
	}

	getCurrentCategoryAndSubcategory(
		category: string,
		subcategory: string
	): Observable<ICurrentCategoryAndSubcategoryResponse> {
		return this.http.get<ICurrentCategoryAndSubcategoryResponse>(
			`${baseUrl}/tasks/${category}/${subcategory}`
		)
	}
}
