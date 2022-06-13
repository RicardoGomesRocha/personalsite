import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BottomMessageConfiguration,
  PopupMessageConfiguration,
} from '../models/message';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

  showBottomMessage(configuration: BottomMessageConfiguration) {
    this.snackbar.open(configuration.message, 'close', {
      duration: configuration.duration ?? 5000,
    });
  }

  showPopupMessage(configuration: PopupMessageConfiguration) {
    const dialogRef = this.dialog.open(PopupMessageComponent, {
      data: configuration,
    });
  }

  showYesNoMessage(
    message: string,
    yesCallback?: () => void,
    noCallback?: () => void
  ) {
    this.showPopupMessage({
      message: message,
      actions: [
        {
          text: 'yes',
          callback: yesCallback,
        },
        {
          text: 'no',
          callback: noCallback,
        },
      ],
    });
  }
}
