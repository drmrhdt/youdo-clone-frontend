import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { CategoriesService } from "../../services/categories.service";
import { TaskService } from "../../services/task.service";
import { Category } from "../../models/Category.model";
import { Subcategory } from "../../models/Subcategory.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  isLoading: boolean = false;

  categoryFromUrl: string = this.route.snapshot.paramMap.get("category");
  subcategoryFromUrl: string = this.route.snapshot.paramMap.get("subcategory");
  currentCategoryObject: Category;
  currentSubcategoryObject: Subcategory;
  categories: Category[] = [];
  // form: FormGroup;
  form = this.formBuilder.group({
    description: ["", Validators.required],
    category: [this.categoryFromUrl, Validators.required],
    subcategory: [this.subcategoryFromUrl, Validators.required],
    comment: ["", Validators.required],
    executionTime: this.formBuilder.group({
      time: ["start", Validators.required],
      startDate: [+new Date(), Validators.required],
      startTime: [+new Date(), Validators.required],
      endDate: null,
      endTime: null,
    }),
    address: ["", Validators.required], // it will be FormArray
    budget: "",
    author: ["", Validators.required],
    email: ["", Validators.required],
    tel: ["", Validators.required],
    additionalConditions: this.formBuilder.group({
      isSubscribeSuggestions: false,
      isShowOnlyToExecutors: false,
    }),
    isBusiness: false,
    isSbr: true,
  });

  ngOnInit() {
    this.isLoading = true;
    this.categoriesService.categories$.subscribe(
      (value) => (this.categories = value)
    );

    this.categoriesService
      .getCurrentCategoryAndSubcategory(
        this.categoryFromUrl,
        this.subcategoryFromUrl
      )
      .subscribe((response) => {
        this.currentCategoryObject = response.data.currentCategory;
        this.categoriesService
          .getSubcategoriesByCategoryId(this.currentCategoryObject)
          .subscribe(
            (response) =>
              (this.currentCategoryObject.subcategories =
                response.data.subcategories)
          );
        this.currentSubcategoryObject = response.data.currentSubcategory;
      });

    this.isLoading = false;
  }

  updateSelectSubcategory() {
    this.currentCategoryObject = this.categories.find(
      (category) => category.key === this.form.get("category").value
    );
    this.form.controls.subcategory.patchValue(
      this.currentCategoryObject.subcategories[0].code
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const newTask = {
      createDate: +new Date(),
      ...this.form.value,
      reviews: {
        positive: 0,
        negative: 0,
      },
    };
    newTask.executionTime = {
      startDate: +new Date(
        newTask.executionTime.startDate + " " + newTask.executionTime.startTime
      ),
      startTime: +new Date(
        newTask.executionTime.startDate + " " + newTask.executionTime.startTime
      ),
      endDate: +new Date(
        newTask.executionTime.endTime + " " + newTask.executionTime.endDate
      ),
      endTime: +new Date(
        newTask.executionTime.endTime + " " + newTask.executionTime.endDate
      ),
    };
    this.taskService.createTask(newTask).subscribe(console.log);
    console.warn(this.form.value);
    this.form.reset();
  }
}
