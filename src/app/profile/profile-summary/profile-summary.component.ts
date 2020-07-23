import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "src/models/IUser.model";

@Component({
  selector: "app-profile-summary",
  templateUrl: "./profile-summary.component.html",
  styleUrls: ["./profile-summary.component.scss"],
})
export class ProfileSummaryComponent implements OnInit {
  @Input() user: IUser;
  @Input() isMyProfile: boolean = false;

  get userIsOnline(): boolean {
    return window.navigator.onLine;
  }

  constructor() {}

  ngOnInit(): void {}
}