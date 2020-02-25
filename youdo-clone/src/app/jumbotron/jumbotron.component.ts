import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-jumbotron",
  templateUrl: "./jumbotron.component.html",
  styleUrls: ["./jumbotron.component.scss"]
})
export class JumbotronComponent implements OnInit {
  exampleQuery: string = "подключить водонагреватель";
  inputValue: string = "";

  moveTextToInput(): void {
    this.inputValue = this.exampleQuery;
  }

  constructor() {}

  ngOnInit(): void {}
}
