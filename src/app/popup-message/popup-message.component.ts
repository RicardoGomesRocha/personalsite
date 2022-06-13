import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupMessageConfiguration } from '../models/message';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.scss'],
})
export class PopupMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupMessageConfiguration
  ) {}

  close() {
    this.dialogRef.close();
  }
  onClickAction(index: number) {
    if (this.data.actions && this.data.actions[index]) {
      const action = this.data.actions[index];
      if (action.callback) action.callback();
      if (action.closeOnClick === undefined || action.closeOnClick === true)
        this.close();
    }
  }
}
