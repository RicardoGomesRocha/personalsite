import { Component, Inject, Input } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { BottomMenuItem } from './bottom-menu.model';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})
export class BottomMenuComponent {
  @Input()
  items: BottomMenuItem[] | undefined;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomMenuComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { items: BottomMenuItem[] }
  ) {
    this.items = data.items;
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
