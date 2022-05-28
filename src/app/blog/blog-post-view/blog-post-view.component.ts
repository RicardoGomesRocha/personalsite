import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-post-view',
  templateUrl: './blog-post-view.component.html',
  styleUrls: ['./blog-post-view.component.scss'],
})
export class BlogPostViewComponent {
  $blogPost: Observable<BlogPost>;
  blogPost: BlogPost | undefined;
  constructor(
    private readonly blogService: BlogService,
    private route: ActivatedRoute
  ) {
    this.$blogPost = this.blogService.getBlogPost(
      route.snapshot.paramMap.get('id') || ''
    );
    this.$blogPost.subscribe((blogPost) => (this.blogPost = blogPost));
  }
}
