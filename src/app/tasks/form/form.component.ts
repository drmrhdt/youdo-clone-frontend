import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { Subject } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { CategoriesService, TaskService, UserService } from 'src/services'

import { ICategory, ISubcategory, IUser } from 'src/models'

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
    isLoading: boolean = false
    form: FormGroup
    currentCategoryObject: ICategory
    currentSubcategoryObject: ISubcategory
    categories: ICategory[] = []
    signedInUser: IUser

    timeOptions = [
        { name: 'Начать работу', value: 'start' },
        { name: 'Закончить работу', value: 'end' },
        { name: 'Выбрать период', value: 'period' }
    ]

    private _unsubscriber$ = new Subject()

    constructor(
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _categoriesService: CategoriesService,
        private _taskService: TaskService,
        private _userService: UserService
    ) {
        this.form = this._formBuilder.group({
            description: ['', Validators.required],
            category: [this.categoryFromUrl, Validators.required],
            subcategory: [this.subcategoryFromUrl, Validators.required],
            comment: ['', Validators.required],
            executionTime: this._formBuilder.group({
                startDate: [+new Date(), Validators.required], // make today default
                startTime: [+new Date(), Validators.required],
                endDate: null,
                endTime: null
            }),
            address: ['', Validators.required], // it will be FormArray
            budget: '',
            author: [''],
            tel: ['', Validators.required],
            additionalConditions: this._formBuilder.group({
                isSubscribeSuggestions: false,
                isShowOnlyToExecutors: false
            }),
            isBusiness: false,
            isSbr: true
        })
    }

    get categoryFromUrl(): string {
        return this._route.snapshot.queryParamMap.get('category')
    }

    get subcategoryFromUrl(): string {
        return this._route.snapshot.queryParamMap.get('subcategory')
    }

    ngOnInit(): void {
        this.isLoading = true

        this._categoriesService.categoriesListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((value: ICategory[]) => {
                this.categories = value

                if (this.categories) {
                    this.currentCategoryObject = this.categories.find(
                        (category: ICategory) =>
                            category.key === this.categoryFromUrl
                    )

                    this.currentSubcategoryObject = this.currentCategoryObject.subcategories.find(
                        (subcategory: ISubcategory) =>
                            subcategory.code === this.subcategoryFromUrl
                    )

                    this.isLoading = false
                }
            })

        this._route.queryParams.subscribe(params =>
            this.form.get('description').patchValue(params['description'])
        )

        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IUser) => {
                this.signedInUser = response
                if (this.signedInUser) {
                    // TODO rewrite
                    this.form.get('author').patchValue(this.signedInUser._id)
                    this.form
                        .get('tel')
                        .patchValue(this.signedInUser.contacts.phone)
                }
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    updateSelectSubcategory(): void {
        this.currentCategoryObject = this.categories.find(
            (category: ICategory) =>
                category.key === this.form.get('category').value
        )
        this.form.controls.subcategory.patchValue(
            this.currentCategoryObject.subcategories[0].code
        )
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return
        }

        const newTask = {
            createDate: +new Date(),
            ...this.form.value,
            reviews: {
                positive: 0,
                negative: 0
            },
            executionTime: {
                startDate: +new Date(
                    this.form.value.executionTime.startDate +
                        ' ' +
                        this.form.value.executionTime.startTime
                ),
                endDate: +new Date(
                    this.form.value.executionTime.endDate +
                        ' ' +
                        this.form.value.executionTime.endTime
                )
            }
        }

        const taskInfo = {
            ...this._userService.currentUserListener$.value.taskInfo,
            total: ++this._userService.currentUserListener$.value.taskInfo
                .total,
            created: ++this._userService.currentUserListener$.value.taskInfo
                .created
        }

        this._taskService
            .createTask(newTask)
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(() => this._userService.updateMe({ taskInfo }))
            )
            .subscribe()
    }
}
