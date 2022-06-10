import { Component } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentModel } from 'src/app/comments/comment/comment.model';
import { BlogPost } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ShareService } from 'src/app/services/share.service';

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
    private route: ActivatedRoute,
    private readonly shareService: ShareService
  ) {
    this.$blogPost = this.blogService.getBlogPost(
      route.snapshot.paramMap.get('id') || ''
    );
    this.$blogPost.subscribe((blogPost) => (this.blogPost = blogPost));
  }

  openShareMenu() {
    this.shareService.share('Im a blog post', window.location.href);
  }

  addLike() {
    if (this.blogPost) {
      if (!this.blogPost.likes) this.blogPost.likes = 0;
      this.blogService.setLikes(this.blogPost.id, ++this.blogPost.likes);
    }
  }
  addComment(comment: DocumentReference<CommentModel>) {
    let comments = this.blogPost?.comments;

    if (!comments) comments = [comment];
    else comments.push(comment);

    if (this.blogPost?.id)
      this.blogService.setComments(this.blogPost?.id, comments);
  }
}
