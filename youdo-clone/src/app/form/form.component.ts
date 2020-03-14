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
  styleUrls: ["./form.component.scss"]
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
      endTime: null
    }),
    address: ["", Validators.required], // it will be FormArray
    budget: "",
    author: ["", Validators.required],
    email: ["", Validators.required],
    tel: ["", Validators.required],
    additionalConditions: this.formBuilder.group({
      isSubscribeSuggestions: false,
      isShowOnlyToExecutors: false
    }),
    isBusiness: false,
    isSbr: true
  });

  ngOnInit() {
    this.isLoading = true;
    this.categories = this.categoriesService.categories;
    this.currentCategoryObject = this.categories.find(
      category => category.key === this.categoryFromUrl
    );

    this.currentSubcategoryObject = this.currentCategoryObject.subcategories.find(
      subcategory => subcategory.code.toLowerCase() === this.subcategoryFromUrl
    );
    this.isLoading = false;
  }

  updateSelectSubcategory() {
    this.currentCategoryObject = this.categories.find(
      category => category.key === this.form.get("category").value
    );
    this.form.controls.subcategory.patchValue(
      this.currentCategoryObject.subcategories[0].code
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    const newTask = {
      createDate: new Date(),
      ...this.form.value,
      reviews: {
        positive: 0,
        negative: 0
      }
    };
    this.taskService.createTask(newTask).subscribe(console.log);
    console.warn(this.form.value);
    this.form.reset();
  }
}
