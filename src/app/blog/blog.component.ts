import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  $posts: Observable<BlogPost[]>;

  constructor(public readonly blogService: BlogService) {
    this.$posts = this.blogService.$blogPosts;
  }
}
