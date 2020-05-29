import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "src/models/IUser.model";
import { IUserResponse } from "src/models/IUserResponse.model";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent implements OnInit {
  get idFromUrl(): string {
    return this.route.snapshot.paramMap.get("id");
  }

  get isMyProfile(): boolean {
    return this.idFromUrl === this.signedInUserId;
  }

  user: IUser;
  signedInUserId: string = "";

  private _unsubscriber$ = new Subject();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.currentUserListener$
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((response: IUser) => {
        if (response) this.signedInUserId = response._id;
      });

    if (!this.isMyProfile)
      this.userService
        .getUserInfoById(this.idFromUrl)
        .pipe(takeUntil(this._unsubscriber$))
        .subscribe((response: IUserResponse) => {
          this.user = response.data.findedByIdUser;
        });
    else
      this.userService.currentUserListener$
        .pipe(takeUntil(this._unsubscriber$))
        .subscribe((response: IUser) => {
          this.user = response;
        });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }
}
