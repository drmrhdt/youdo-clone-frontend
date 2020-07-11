import { Component, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { CategoriesService } from 'src/services'

import { ICategoriesResponse } from 'src/models'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    isLoading: boolean = true

    private _unsubscriber$ = new Subject()

    constructor(private _categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this._categoriesService
            .getCategoriesWithSubcategories()
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: ICategoriesResponse) => {
                this._categoriesService.categoriesListener$.next(
                    response.data.categories
                )
                this.isLoading = false
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}
