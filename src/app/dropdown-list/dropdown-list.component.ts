import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../../models/Category.model";

@Component({
  selector: "app-dropdown-list",
  templateUrl: "./dropdown-list.component.html",
  styleUrls: ["./dropdown-list.component.scss"],
})
export class DropdownListComponent implements OnInit {
  @Input() categories: Category[] = [];

  constructor() {}

  ngOnInit() {}
}
