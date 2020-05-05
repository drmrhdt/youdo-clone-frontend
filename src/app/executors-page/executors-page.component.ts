import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { IUser } from "../../models/IUser.model";
import { IUsersResponse } from "src/models/IUsersResponse.model";

@Component({
  selector: "app-executors-page",
  templateUrl: "./executors-page.component.html",
  styleUrls: ["./executors-page.component.scss"],
})
export class ExecutorsPageComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsersByFilter("isExecutor", true)
      .subscribe(
        (response: IUsersResponse) => (this.users = response.data.users)
      );
  }
}
