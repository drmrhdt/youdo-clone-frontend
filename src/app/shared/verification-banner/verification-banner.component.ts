import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-verification-banner",
  templateUrl: "./verification-banner.component.html",
  styleUrls: ["./verification-banner.component.scss"],
})
export class VerificationBannerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigateByUrl("youdo-clone/verification/personalinfo");
  }
}
