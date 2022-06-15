import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';
import { BlogPost } from 'src/app/models/blog';
import { Category } from 'src/app/models/category';
import { BlogService } from 'src/app/services/blog.service';
import { RouteService } from 'src/app/services/route.service';
import { UserService } from 'src/app/users/users.services';

@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrls: ['./blog-post-edit.component.scss'],
})
export class BlogPostEditComponent {
  blogPostForm = new FormGroup({
    title: new FormControl(''),
    createdDate: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    image: new FormControl(''),
  });

  $blogPost: Observable<BlogPost> | undefined;

  blogPostId: string = '';

  imageUrl: string | undefined;

  newImage: File | undefined;

  isLoading = false;

  loadingPercentage = 0;

  editMode = false;

  blogPost: BlogPost | undefined;

  get categories(): Category[] {
    if (this.blogPost && this.blogPost.categories)
      return this.blogPost.categories;

    return [];
  }

  set categories(value: Category[] | undefined) {
    if (this.blogPost?.categories) this.blogPost.categories = value;
  }

  constructor(
    private readonly blogService: BlogService,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UserService
  ) {
    this.editMode = route.snapshot.data['mode'] === 'edit' ? true : false;
    if (this.editMode) {
      this.$blogPost = this.blogService.getBlogPost(
        route.snapshot.paramMap.get('id') || ''
      );
      this.$blogPost.subscribe((blogPost) => this.setFormField(blogPost));
    }
  }

  setFormField(blogPost: BlogPost) {
    this.blogPostId = blogPost.id;
    this.imageUrl = blogPost.image;
    this.blogPostForm.setValue({
      title: blogPost.title || '',
      createdDate: blogPost.createdDate || null,
      description: blogPost.description || '',
      body: blogPost.body || '',
      image: blogPost.image || '',
    });
    this.blogPost = blogPost;
    this.categories = blogPost.categories;
  }

  async save() {
    const blogPost = this.getProjectFromFormField();
    blogPost.id = this.blogPostId;
    if (!this.editMode) {
      blogPost.createdDate = Timestamp.fromDate(new Date());
      const user = await firstValueFrom(this.usersService.getCurrentUser());
      if (user) {
        blogPost.authorId = user?.uid;
      }
    }
    blogPost.modifiedDate = Timestamp.fromDate(new Date());
    blogPost.categoriesRefs =
      this.categoriesService.getDocumentReferenceFromCategories(
        this.blogPost?.categories
      );
    blogPost.categories = this.categories;
    this.isLoading = true;

    this.blogService.saveBlogPost(blogPost, this.newImage).subscribe({
      next: (value) => {
        if (value.percentage === 100) {
          this.routeService.navigate(['/blogPosts', value.blogPostId]);
        }
        this.loadingPercentage = value.percentage;
      },
      error: () => {
        this.loadingPercentage = 0;
        this.isLoading = false;
      },
    });
  }

  private getProjectFromFormField(): BlogPost {
    return this.blogPostForm.value as BlogPost;
  }
}
