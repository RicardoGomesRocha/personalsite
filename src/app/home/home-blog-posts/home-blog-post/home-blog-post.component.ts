import { Component, Input } from '@angular/core';
import { BlogPost } from 'src/app/models/blog';

@Component({
  selector: 'app-home-blog-post',
  templateUrl: './home-blog-post.component.html',
  styleUrls: ['./home-blog-post.component.scss'],
})
export class HomeBlogPostComponent {
  @Input()
  post: BlogPost | undefined;

  getBackgroundImage(): string {
    return `url(${this.post?.image})`;
  }
}
