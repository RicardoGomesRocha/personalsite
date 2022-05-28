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
  map,
  Observable,
} from 'rxjs';
import { BlogPost } from '../models/blog';
import { Search, SearchableService } from '../search/search.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements SearchableService {
  private blogPostsCollection: AngularFirestoreCollection<BlogPost>;

  $blogPosts: Observable<BlogPost[]>;

  $searchResults: Observable<Search[]>;

  private $searchText = new BehaviorSubject<string>('');

  constructor(private readonly afs: AngularFirestore) {
    this.blogPostsCollection = afs.collection<BlogPost>('blogPosts');
    this.$blogPosts = this.blogPostsCollection.valueChanges({ idField: 'id' });
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
}
