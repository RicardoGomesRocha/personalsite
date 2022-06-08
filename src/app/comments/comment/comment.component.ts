import { Component, Input } from '@angular/core';
import { CommentModel } from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input()
  comment: CommentModel | undefined;

  @Input()
  mode: 'view' | 'edit' = 'view';
}
