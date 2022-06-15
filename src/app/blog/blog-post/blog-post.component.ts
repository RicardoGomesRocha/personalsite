import { Component, Input } from '@angular/core';
import { BlogPost } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/users/users.services';
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

  $showAdminOptions = this.usersService.hasRoles(['admin']);

  constructor(
    private readonly usersService: UserService,
    private readonly blogService: BlogService,
    private readonly messageService: MessageService
  ) {}

  delete() {
    this.messageService.showYesNoMessage(
      'Are you sure that you want to delete this blog post?',
      () => {
        if (this.post?.id) this.blogService.deleteBlogPost(this.post?.id);
      }
    );
  }
}
