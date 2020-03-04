import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../publication.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  constructor(
    private publicationService: PublicationService,
    private formBuilder: FormBuilder
  ) {}

  form = this.formBuilder.group({
    description: ["", Validators.required],
    category: ["any", Validators.required],
    subcategory: ["any", Validators.required],
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

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.form.value);
  }
}
