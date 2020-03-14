import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../../services/categories.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Category, Subcategory } from "../../models/Category.model";
import { TaskService } from "../../services/task.service";

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
    // category: this.formBuilder.group({
    //   title_ru: "this.currentCategoryObject.title_ru",
    //   title_en: [this.categoryFromUrl, Validators.required]
    // subcategory: this.formBuilder.group({
    //   title_ru: "this.currentSubcategoryObject.title_ru",
    //   title_en: [this.subcategoryFromUrl, Validators.required]
    // })
    // }),
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
      category => category.title_en === this.categoryFromUrl
    );

    this.currentSubcategoryObject = this.currentCategoryObject.subcategories.find(
      subcategory => subcategory.title_en === this.subcategoryFromUrl
    );
    this.isLoading = false;
  }

  updateSelectSubcategory() {
    this.form.get("category").valueChanges.subscribe(() => {
      this.currentCategoryObject = this.categories.find(
        category => category.title_en === this.form.get("category").value
      );
      this.form.controls.subcategory.patchValue(
        this.currentCategoryObject.subcategories[0].title_en
      );
    });
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
