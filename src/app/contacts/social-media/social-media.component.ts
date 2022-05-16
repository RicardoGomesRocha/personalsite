import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent {
  @Input()
  name: string = '';

  @Input()
  image: string = '';

  @Input()
  url: string = '';

  openNewTab() {
    window.open(this.url, '_blank');
  }
}
