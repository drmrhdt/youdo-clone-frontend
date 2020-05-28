import { Component, OnInit, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-section-header",
  templateUrl: "./section-header.component.html",
  styleUrls: ["./section-header.component.scss"],
})
export class SectionHeaderComponent implements OnInit {
  @Input() title: string = "Все категории";
  @Input() bodyComponent: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
