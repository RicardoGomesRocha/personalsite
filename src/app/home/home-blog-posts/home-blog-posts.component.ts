import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home-blog-posts',
  templateUrl: './home-blog-posts.component.html',
  styleUrls: ['./home-blog-posts.component.scss'],
})
export class HomeBlogPostsComponent {
  $posts: Observable<BlogPost[]>;
  constructor(private readonly blogService: BlogService) {
    this.$posts = this.blogService.$blogPosts;
  }
}
