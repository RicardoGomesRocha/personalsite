import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  combineLatest,
  first,
  flatMap,
  forkJoin,
  map,
  Observable,
  take,
} from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { BlogPost } from '../models/blog';
import { Category } from '../models/category';
import { Search, SearchableService } from '../search/search.model';

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
    private readonly categoriesService: CategoriesService
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
              link: `blogPosts/${blogPost.id}/`,
              categories: ['', ''],
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

  setLikes(projectId: string, likes: number) {
    this.blogPostsCollection.doc(projectId).update({
      likes,
    });
  }
}
