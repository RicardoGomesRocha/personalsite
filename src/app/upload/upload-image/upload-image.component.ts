import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Input()
  imageUrl: string | undefined;

  @Output()
  imageUrlChange = new EventEmitter<string | undefined>();

  @Output()
  fileChange = new EventEmitter<File>();

  change(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.fileChange.emit(file);
  }
}
