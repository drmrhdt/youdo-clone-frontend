import { Component, OnInit } from "@angular/core";
import { Executor } from "src/models/Executor.model";
import { UserService } from "src/services/user.service";

@Component({
  selector: "app-executors-page",
  templateUrl: "./executors-page.component.html",
  styleUrls: ["./executors-page.component.scss"],
})
export class ExecutorsPageComponent implements OnInit {
  executors: Executor[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsersByFilter("isExecutor", true)
      .subscribe((response) => (this.executors = response.data.users));
  }
}
