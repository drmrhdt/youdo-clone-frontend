import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'

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
    currentCategoryObject: ICategory
    currentSubcategoryObject: ISubcategory
    categories: ICategory[] = []
    signedInUser: IUser

    private _unsubscriber$ = new Subject()

    constructor(
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _categoriesService: CategoriesService,
        private _taskService: TaskService,
        private _userService: UserService
    ) {}

    get categoryFromUrl(): string {
        return this._route.snapshot.queryParamMap.get('category')
    }

    get subcategoryFromUrl(): string {
        return this._route.snapshot.queryParamMap.get('subcategory')
    }

    form = this._formBuilder.group({
        description: ['', Validators.required],
        category: [this.categoryFromUrl, Validators.required],
        subcategory: [this.subcategoryFromUrl, Validators.required],
        comment: ['', Validators.required],
        executionTime: this._formBuilder.group({
            time: ['start', Validators.required],
            startDate: [+new Date(), Validators.required],
            startTime: [+new Date(), Validators.required],
            endDate: null,
            endTime: null
        }),
        address: ['', Validators.required], // it will be FormArray
        budget: '',
        author: [''],
        authorId: ['', Validators.required],
        email: ['', Validators.required],
        tel: ['', Validators.required],
        additionalConditions: this._formBuilder.group({
            isSubscribeSuggestions: false,
            isShowOnlyToExecutors: false
        }),
        isBusiness: false,
        isSbr: true
    })

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
                    this.form.get('authorId').patchValue(this.signedInUser._id)
                    this.form
                        .get('email')
                        .patchValue(this.signedInUser.contacts.email)
                    this.form
                        .get('tel')
                        .patchValue(this.signedInUser.contacts.phone)
                    this.form
                        .get('author')
                        .patchValue(this.signedInUser.personalInfo.firstName)
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
            }
        }
        newTask.executionTime = {
            startDate: +new Date(
                newTask.executionTime.startDate +
                    ' ' +
                    newTask.executionTime.startTime
            ),
            startTime: +new Date(
                newTask.executionTime.startDate +
                    ' ' +
                    newTask.executionTime.startTime
            ),
            endDate: +new Date(
                newTask.executionTime.endTime +
                    ' ' +
                    newTask.executionTime.endDate
            ),
            endTime: +new Date(
                newTask.executionTime.endTime +
                    ' ' +
                    newTask.executionTime.endDate
            )
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
                flatMap(() => {
                    return this._userService.updateMe({ taskInfo })
                })
            )
            .subscribe()

        console.warn(this.form.value)
        this.form.reset()
    }
}
