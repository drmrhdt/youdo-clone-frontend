import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../publication.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

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
    description: "",
    category: "",
    subcategory: "",
    comment: "",
    time: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    address: "", // it will be FormArray
    isBusiness: false,
    budget: "",
    fullName: "",
    email: "",
    tel: "",
    number: "",
    isSubscribeSuggestions: false,
    isShowOnlyToExecutors: false
  });

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.form.value);
  }
}
