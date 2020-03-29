import { Component, OnInit } from "@angular/core";
import { ExecutorsService } from "../executors.service";
import { Executor } from "src/models/Executor.model";

@Component({
  selector: "app-executors-page",
  templateUrl: "./executors-page.component.html",
  styleUrls: ["./executors-page.component.scss"]
})
export class ExecutorsPageComponent implements OnInit {
  executors: Executor[] = [];

  constructor(private executorsService: ExecutorsService) {}

  ngOnInit(): void {
    this.executorsService
      .getExecutorsList()
      .subscribe(response => (this.executors = response.data.executors));
  }
}
