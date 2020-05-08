import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { ActivatedRoute } from "@angular/router";
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.currentUserListener$.subscribe(
      (response: IUserResponse) =>
        (this.signedInUserId = response.data.currentUser._id)
    );

    if (!this.isMyProfile)
      this.userService
        .getUserInfoById(this.idFromUrl)
        .subscribe((response: IUserResponse) => {
          this.user = response.data.findedByIdUser;
        });
    else
      this.userService.currentUserListener$.subscribe(
        (response: IUserResponse) => {
          this.user = response.data.currentUser;
        }
      );
  }
}
