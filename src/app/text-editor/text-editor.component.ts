import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  config = {
    syntax: true,
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['link'],
    ],
  };
}
