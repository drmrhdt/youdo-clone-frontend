import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isHover: boolean = false;

  @ViewChild("createTaskLink") createTaskLink: ElementRef;

  @HostListener("document:click")
  onClick() {
    if (!this.createTaskLink.nativeElement.contains(event.target))
      this.isHover = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
