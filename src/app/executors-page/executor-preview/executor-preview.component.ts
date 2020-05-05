import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "src/models/IUser.model";

@Component({
  selector: "app-executor-preview",
  templateUrl: "./executor-preview.component.html",
  styleUrls: ["./executor-preview.component.scss"],
})
export class ExecutorPreviewComponent implements OnInit {
  @Input() executor: IUser;

  constructor(private route: Router) {}

  // TODO rewrite with routerLink
  navigateToUserProfile(id: string): void {
    this.route.navigateByUrl(`/youdo/profile/${id}`);
  }

  ngOnInit(): void {}
}
