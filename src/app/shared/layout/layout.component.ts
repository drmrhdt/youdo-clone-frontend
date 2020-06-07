import { Component, Input, TemplateRef } from "@angular/core"

enum Layouts {
  FromSmallToBig = "fromSmallToBig",
  FromBigToSmall = "fromBigToSmall",
}

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  @Input() layout: Layouts = Layouts.FromSmallToBig
  @Input() leftBlock: TemplateRef<any>
  @Input() rightBlock: TemplateRef<any>
  layouts = Layouts

  constructor() {}
}
