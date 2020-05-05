import { Component, OnInit, Input } from "@angular/core";
import { ICategory } from "../../models/ICategory.model";

@Component({
  selector: "app-dropdown-list",
  templateUrl: "./dropdown-list.component.html",
  styleUrls: ["./dropdown-list.component.scss"],
})
export class DropdownListComponent implements OnInit {
  @Input() categories: ICategory[] = [];

  constructor() {}

  ngOnInit() {}
}
