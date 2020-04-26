import { Component, OnInit, Input } from "@angular/core";
import { Task } from "../../../models/Task.model";

@Component({
  selector: "app-task-preview",
  templateUrl: "./task-preview.component.html",
  styleUrls: ["./task-preview.component.scss"],
})
export class TaskComponent implements OnInit {
  constructor() {}

  @Input() task: Task;

  ngOnInit(): void {}
}
