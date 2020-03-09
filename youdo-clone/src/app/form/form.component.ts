import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from "../../services/publication.service";
import { CategoriesService } from "../../services/categories.service";
import { Observable, concat } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Category, Subcategory } from "../../models/Category.model";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  constructor(
    private publicationService: PublicationService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean = false;

  categoryFromUrl: string = this.route.snapshot.paramMap.get("category");
  subcategoryFromUrl: string = this.route.snapshot.paramMap.get("subcategory");
  currentCategoryObject: Category;
  currentSubcategoryObject: Subcategory;
  categories: Category[] = [];

  form = this.formBuilder.group({
    description: ["", Validators.required],
    category: [this.categoryFromUrl, Validators.required],
    subcategory: [this.subcategoryFromUrl, Validators.required],
    comment: ["", Validators.required],
    time: ["start", Validators.required],
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    address: ["", Validators.required], // it will be FormArray
    isBusiness: false,
    budget: "",
    fullName: ["", Validators.required],
    email: ["", Validators.required],
    tel: ["", Validators.required],
    isSubscribeSuggestions: false,
    isShowOnlyToExecutors: false
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
    console.warn(this.form.value);
  }
}
