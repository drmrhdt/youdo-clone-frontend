import { Component, OnInit, Input } from "@angular/core";
import { Executor } from "src/models/Executor.model";

@Component({
  selector: "app-executor-preview",
  templateUrl: "./executor-preview.component.html",
  styleUrls: ["./executor-preview.component.scss"]
})
export class ExecutorPreviewComponent implements OnInit {
  @Input() executor: Executor;

  constructor() {}

  ngOnInit(): void {}
}
