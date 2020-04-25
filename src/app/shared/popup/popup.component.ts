import {
  Component,
  OnInit,
  Output,
  Input,
  TemplateRef,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
})
export class PopupComponent implements OnInit {
  @Input() isShowSubmitBtn: boolean = true;
  @Input() submitTitle: string = "Подтвердить";
  @Input() isShowCloseBtn: boolean = true;
  @Input() isShowCancelBtn: boolean = false;
  @Input() cancelTitle: string = "Отменить";
  @Input() popupTitle: string = "";

  @Input() bodyComponent: TemplateRef<any>;

  @Output() close: EventEmitter<null> = new EventEmitter<null>();
  @Output() submit: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit(): void {}

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.closeDialog();
  }
}
