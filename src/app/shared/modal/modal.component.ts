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
  @Input() isShowSubmitBtn: boolean = true;
  @Input() submitTitle: string = "Подтвердить";
  @Input() isShowCloseBtn: boolean = true;
  @Input() isShowCancelBtn: boolean = false;
  @Input() cancelTitle: string = "Отменить";
  @Input() modalTitle: string = "";

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
