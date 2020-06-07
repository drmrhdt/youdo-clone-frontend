import {
  Component,
  Output,
  Input,
  TemplateRef,
  EventEmitter,
} from "@angular/core"

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() isShowCloseBtn: boolean = true
  @Input() modalTitle: string = ""

  @Input() bodyComponent: TemplateRef<any>

  @Output() close: EventEmitter<null> = new EventEmitter<null>()

  closeDialog(): void {
    this.close.emit()
  }
}
