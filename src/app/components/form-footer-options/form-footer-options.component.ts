import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-footer-options',
  templateUrl: './form-footer-options.component.html',
  styleUrls: ['./form-footer-options.component.css'],
})
export class FormFooterOptionsComponent {
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  onEmitCancel(): void {
    this.onCancel.emit();
  }

  onEmitSave(): void {
    this.onSave.emit();
  }
}
