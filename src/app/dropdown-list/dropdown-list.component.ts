import { Component, Input } from "@angular/core"

import { ICategory } from "../../models/ICategory.model"

@Component({
  selector: "app-dropdown-list",
  templateUrl: "./dropdown-list.component.html",
  styleUrls: ["./dropdown-list.component.scss"],
})
export class DropdownListComponent {
  @Input() categories: ICategory[] = []

  constructor() {}
}
