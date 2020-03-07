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

  currentCategory: string;
  currentSubcategory: string;
  currentCategoryObject: Category;
  currentSubcategoryObject: Subcategory;
  categories: Category[] = [];

  currentCategory$: Observable<string> = this.route.params.pipe(
    map(p => (this.currentCategory = p.category))
  );
  currentSubcategory$: Observable<string> = this.route.params.pipe(
    map(p => (this.currentSubcategory = p.subcategory))
  );
  categories$: Observable<
    Category[]
  > = this.categoriesService
    .getCategories()
    .pipe(map(response => (this.categories = response.categories)));

  form = this.formBuilder.group({
    description: ["", Validators.required],
    category: [this.currentCategory, Validators.required],
    subcategory: [this.currentSubcategory, Validators.required],
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
    // this.categoriesService.getCategories().subscribe(response => {
    //   this.categories$ = response.categories;
    // });
    // this.currentSubcategory$.subscribe(currentCategory => {
    //   this.currentCategory = currentCategory;
    //   console.log(
    //     this.categories.find(category => category.title_en === "courier")
    //   );
    // });
    concat(
      this.categories$,
      this.currentCategory$,
      this.currentSubcategory$
    ).subscribe(() => {
      console.log(
        this.categories,
        this.currentCategory,
        this.currentSubcategory
      );
      this.getCurrentSubcategory();
    });
  }

  getCurrentSubcategory() {
    this.currentCategoryObject = this.categories.find(
      category => category.title_en === this.currentCategory
    );

    this.currentSubcategoryObject = this.currentCategoryObject.subcategories.find(
      subcategory => subcategory.title_en === this.currentSubcategory
    );
  }

  onSubmit() {
    console.warn(this.form.value);
  }
}
