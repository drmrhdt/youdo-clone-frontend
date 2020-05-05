import { Component, OnInit } from "@angular/core";
import { UserService } from "src/services/user.service";
import { ActivatedRoute } from "@angular/router";

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

  signedInUserId: string = "";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      (response) => (this.signedInUserId = response.data.currentUser._id)
    );

    if (!this.isMyProfile) {
      this.userService.getUserInfoById(this.idFromUrl).subscribe(console.log);
    }
  }
}