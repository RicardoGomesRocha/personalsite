import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input()
  color = 'primary';

  @Input()
  checked = false;

  @Input()
  loading = false;

  @Output()
  changed = new EventEmitter<boolean>();

  onChange(event: MatCheckboxChange) {
    this.changed.emit(event.checked);
  }
}
