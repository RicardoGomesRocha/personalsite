import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomMessageConfiguration } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private snackbar: MatSnackBar) {}
  openBottomMessage(configuration: BottomMessageConfiguration) {
    this.snackbar.open(configuration.message, 'close', {
      duration: configuration.duration ?? 5000,
    });
  }
}
