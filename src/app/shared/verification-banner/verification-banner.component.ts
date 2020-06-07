import { Component } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-verification-banner",
  templateUrl: "./verification-banner.component.html",
  styleUrls: ["./verification-banner.component.scss"],
})
export class VerificationBannerComponent {
  constructor(private _router: Router) {}

  onClick(): void {
    this._router.navigateByUrl("youdo-clone/verification/personalinfo")
  }
}
