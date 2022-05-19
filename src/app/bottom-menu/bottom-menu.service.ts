import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomMenuComponent } from './bottom-menu.component';
import { BottomMenuItem } from './bottom-menu.model';

@Injectable({
  providedIn: 'root',
})
export class BottomMenuService {
  constructor(private _bottomSheet: MatBottomSheet) {}
  openBottomMenu(items: BottomMenuItem[]): void {
    this._bottomSheet.open(BottomMenuComponent, {
      data: {
        items,
      },
    });
  }
}
