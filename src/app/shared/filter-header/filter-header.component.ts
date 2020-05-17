import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-filter-header",
  templateUrl: "./filter-header.component.html",
  styleUrls: ["./filter-header.component.scss"],
})
export class FilterHeaderComponent implements OnInit {
  @Input() title: string = "Все категории";
  @Input() bodyComponent: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
