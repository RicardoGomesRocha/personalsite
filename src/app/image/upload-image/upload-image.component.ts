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

  onDrag = false;

  change(event: any) {
    const file: File = event.target.files[0];
    this.readFile(file);
  }

  getBackgroundImage() {
    const src = this.imageUrl
      ? this.imageUrl
      : '/assets/images/triangles-background.jpg';
  }

  drop(event: any) {
    // event.preventDefault();
    // event.stopPropagation();
    // const files = event.dataTransfer?.files;
    // if (files?.length) {
    //   this.readFile(files[0]);
    // }
    console.log(event);
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.fileChange.emit(file);
  }
}
