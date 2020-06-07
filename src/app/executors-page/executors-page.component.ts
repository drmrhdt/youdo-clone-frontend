import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/services/user.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "../../models/IUser.model";
import { IUsersResponse } from "src/models/IUsersResponse.model";
import { Filters } from "src/models/enum/Filters";

@Component({
  selector: "app-executors-page",
  templateUrl: "./executors-page.component.html",
  styleUrls: ["./executors-page.component.scss"],
})
export class ExecutorsPageComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  filters = Filters;
  tab: Filters;

  private _unsubscriber$ = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsersByFilter("isExecutor", true)
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe(
        (response: IUsersResponse) => (this.users = response.data.users)
      );
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }

  onTabClick(filter: Filters): void {
    this.tab = filter;
  }
}
