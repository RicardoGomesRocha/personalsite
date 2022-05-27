import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
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

  config: QuillModules = {
    syntax: true,
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // dropdown with defaults from theme
        [{ align: [] }],
        ['link'],
        ['emoji'],
      ],
    },
    'emoji-shortname': true,
    'emoji-textarea': false,
    'emoji-toolbar': true,
  };
}
