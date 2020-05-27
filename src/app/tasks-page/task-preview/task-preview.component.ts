import { Component, OnInit, Input } from "@angular/core";
import { ITask } from "../../../models/ITask.model";

@Component({
  selector: "app-task-preview",
  templateUrl: "./task-preview.component.html",
  styleUrls: ["./task-preview.component.scss"],
})
export class TaskPreviewComponent implements OnInit {
  constructor() {}

  @Input() task: ITask;

  ngOnInit(): void {}
}
