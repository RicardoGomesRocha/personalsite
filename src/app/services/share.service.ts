import { Injectable } from '@angular/core';
import { BottomMenuService } from '../bottom-menu/bottom-menu.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor(private readonly bottomMenuService: BottomMenuService) {}

  share(message: string, link: string) {
    this.bottomMenuService.openBottomMenu([
      {
        icon: '',
        lines: ['Twitter'],
        click: () => alert('not implemented yet'),
      },
      {
        icon: '',
        lines: ['Facebook'],
        click: () => alert('not implemented yet'),
      },
      {
        icon: '',
        lines: ['Github'],
        click: () => alert('not implemented yet'),
      },
      {
        icon: '',
        lines: ['LinkedIn'],
        click: () => alert('not implemented yet'),
      },
    ]);
  }
}
