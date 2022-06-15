import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  combineLatest,
  first,
  flatMap,
  forkJoin,
  map,
  Observable,
  Subscriber,
  take,
} from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { CommentModel } from '../comments/comment/comment.model';
import { BlogPost, BlogPostSaveStatus } from '../models/blog';
import { Category } from '../models/category';
import { UploadStatus, UploadStatuses } from '../models/upload';
import { Search, SearchableService } from '../search/search.model';
import { UploadService } from './upload.service';
@Injectable({
  providedIn: 'root',
})
export class BlogService implements SearchableService {
  private blogPostsCollection: AngularFirestoreCollection<BlogPost>;

  $blogPosts: Observable<BlogPost[]>;

  $searchResults: Observable<Search[]>;

  private $searchText = new BehaviorSubject<string>('');

  constructor(
    private readonly afs: AngularFirestore,
    private readonly categoriesService: CategoriesService,
    private readonly uploadService: UploadService
  ) {
    this.blogPostsCollection = afs.collection<BlogPost>('blogPosts');
    this.$blogPosts = new Observable<BlogPost[]>((sub) => {
      this.blogPostsCollection
        .valueChanges({ idField: 'id' })
        .subscribe((blogPosts) => {
          const blogPostsObservable = new Array<Observable<Category[]>>();
          for (let post of blogPosts) {
            if (post.categoriesRefs) {
              blogPostsObservable.push(
                this.categoriesService
                  .getCategoriesFromDocumentReference(
                    post.categoriesRefs as any
                  )
                  .pipe(take(1))
              );
            }
          }
          if (blogPostsObservable.length > 0) {
            const observable = forkJoin(blogPostsObservable);
            observable.subscribe((categoriesMatrix) => {
              for (let i = 0; i < blogPosts.length; i++) {
                blogPosts[i].categories = categoriesMatrix[i];
              }
              sub.next(blogPosts);
            });
          } else {
            sub.next(blogPosts);
          }
        });
    });

    this.$searchResults = combineLatest([
      this.$blogPosts,
      this.$searchText,
    ]).pipe(
      map((value: [BlogPost[], string]) => {
        const blogPosts = value[0];
        const searchText = value[1];
        return blogPosts
          .filter(
            (blogPost) =>
              blogPost.title.includes(searchText) ||
              blogPost.body.includes(searchText)
          )
          .map((blogPost) => {
            return {
              type: 'Blog Post',
              title: blogPost.title,
              text: [blogPost.body],
              image: blogPost.image,
              link: `/blogPosts/${blogPost.id}/`,
              categories: blogPost.categories?.map(
                (categories) => categories.text
              ),
            } as Search;
          });
      })
    );
  }

  getBlogPost(id: string) {
    return this.$blogPosts.pipe(
      flatMap((blogPosts) => blogPosts),
      first((blogPost) => blogPost.id === id)
    );
  }

  setSearchTextFilter(text: string): void {
    this.$searchText.next(text);
  }

  setLikes(blogPostId: string, likes: number) {
    return this.blogPostsCollection.doc(blogPostId).update({
      likes,
    });
  }

  setComments(blogPostId: string, comments: DocumentReference<CommentModel>[]) {
    this.blogPostsCollection.doc(blogPostId).update({
      comments,
    });
  }

  deleteBlogPost(id: string) {
    return this.blogPostsCollection.doc(id).delete();
  }

  saveBlogPost(
    project: BlogPost,
    newImage?: File
  ): Observable<BlogPostSaveStatus> {
    return new Observable<BlogPostSaveStatus>((sub) => {
      delete project.categories;
      if (newImage) {
        this.upload(newImage, project.id).subscribe((value) => {
          if (value.status === UploadStatuses.Complete) {
            if (value.fileUrl) {
              project.image = value.fileUrl;
            }
            sub.next({ percentage: 80 });
            this.setBlogPost(project, sub);
          } else if (value.status === UploadStatuses.Error) {
            sub.error(new Error('Was not possible to upload the image'));
          } else if (value.status === UploadStatuses.Uploading) {
            sub.next({ percentage: value.percentage || 0 });
          }
        });
      } else {
        sub.next({ percentage: 50 });
        this.setBlogPost(project, sub);
      }
    });
  }

  upload(file: File, blogPostId: string): Observable<UploadStatus> {
    return this.uploadService.upload(`blogPosts/${blogPostId}`, file, 'image');
  }

  private setBlogPost(blogPost: BlogPost, sub: Subscriber<BlogPostSaveStatus>) {
    if (blogPost.id) {
      this.blogPostsCollection
        .doc(blogPost.id)
        .set(blogPost)
        .then(() => sub.next({ percentage: 100, blogPostId: blogPost.id }))
        .catch((error) => sub.error(error));
    } else {
      this.blogPostsCollection.add(blogPost).then(
        (value) => {
          sub.next({ percentage: 100, blogPostId: value.id });
        },
        (error) => sub.error(error)
      );
    }
  }
}
