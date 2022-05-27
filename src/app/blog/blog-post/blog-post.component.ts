import { Component, Input } from '@angular/core';
import { BlogPost } from 'src/app/models/blog';
@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent {
  @Input()
  post: BlogPost | undefined;

  getBackgroundImage(): string {
    return `url(${this.post?.image})`;
  }
}
