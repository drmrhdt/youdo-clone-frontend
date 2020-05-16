import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";

@Component({
  selector: "app-executor-form",
  templateUrl: "./executor-form.component.html",
  styleUrls: ["./executor-form.component.scss"],
})
export class ExecutorFormComponent implements OnInit {
  isSuccess: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService
      .updateMe({ workInfo: { isExecutor: true } })
      .subscribe(() => (this.isSuccess = true));
  }
}
