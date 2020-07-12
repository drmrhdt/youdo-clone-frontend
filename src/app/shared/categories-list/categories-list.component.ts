import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { CategoriesService } from 'src/services'

import { defaultPage } from '../../../config/routes'

import { ICategory } from 'src/models'

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    isLoading: boolean = true
    categories: ICategory[] = []
    selectedCategory: string = ''
    selectedSubcategory: string = ''
    defaultPage: number = defaultPage

    private _unsubscriber$ = new Subject()

    get section(): string {
        return this._route.snapshot.url[0].path
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _categoriesService: CategoriesService
    ) {
        this._route.params
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(params => (this.selectedCategory = params['category']))
    }

    ngOnInit(): void {
        this._categoriesService.categoriesListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: ICategory[]) => {
                this.categories = response
                this.isLoading = false
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    selectAll(): void {
        this._router.navigateByUrl(`${this.section}/all/1`)
    }

    selectCategory(category): void {
        // if (category.key === this.selectedCategory) {
        //     this.selectedCategory = null
        //     return
        // }
        this.selectedCategory = category.key
        this._router.navigateByUrl(
            `${this.section}/${category.key}/${defaultPage}`
        )
    }

    selectSubcategory(category, subcategory): void {
        this.selectedSubcategory = subcategory.code
        this._router.navigate([
            this.section,
            category.key,
            subcategory.code,
            defaultPage
        ])
    }
}
