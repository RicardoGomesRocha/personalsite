import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent {
  @Input()
  mode: 'view' | 'edit' = 'view';

  @Input()
  formGroup: FormGroup | undefined;

  @Input()
  controllerName = '';

  @Input()
  content = '';

  config: QuillModules;

  constructor() {
    const fontSizeArr = [
      '8px',
      '9px',
      '10px',
      '12px',
      '14px',
      '16px',
      '20px',
      '24px',
      '32px',
      '42px',
      '54px',
      '68px',
      '84px',
      '98px',
    ];

    const Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);

    this.config = {
      syntax: true,
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ size: fontSizeArr }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // dropdown with defaults from theme
          [{ align: [] }],
          ['link'],
          ['emoji'],
          ['clean'],
        ],
      },
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
    };
  }
}
