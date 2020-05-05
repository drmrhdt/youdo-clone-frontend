import { Component, OnInit, Input } from "@angular/core";
import { Executor } from "src/models/Executor.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-executor-preview",
  templateUrl: "./executor-preview.component.html",
  styleUrls: ["./executor-preview.component.scss"],
})
export class ExecutorPreviewComponent implements OnInit {
  @Input() executor: Executor;

  navigateToUserProfile(id): void {
    this.route.navigateByUrl(`/youdo/profile/${id}`);
  }

  constructor(private route: Router) {}

  ngOnInit(): void {}
}
