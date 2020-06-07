import { Component } from "@angular/core"

@Component({
  selector: "app-jumbotron",
  templateUrl: "./jumbotron.component.html",
  styleUrls: ["./jumbotron.component.scss"],
})
export class JumbotronComponent {
  exampleQuery: string = "подключить водонагреватель"
  inputValue: string = ""

  constructor() {}

  moveTextToInput(): void {
    this.inputValue = this.exampleQuery
  }
}
