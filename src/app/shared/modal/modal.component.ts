import {
  Component,
  OnInit,
  Output,
  Input,
  TemplateRef,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() isShowCloseBtn: boolean = true;
  @Input() modalTitle: string = "";

  @Input() bodyComponent: TemplateRef<any>;

  @Output() close: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit(): void {}

  closeDialog(): void {
    this.close.emit();
  }
}
