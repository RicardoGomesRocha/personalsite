import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { BlogPost } from '../models/blog';
import { Search, SearchableService } from '../search/search.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService implements SearchableService {
  $blogPosts: Observable<BlogPost[]> = new Observable<BlogPost[]>((sub) => {
    sub.next(this.getMockBlogPosts());
  });

  $searchResults: Observable<Search[]>;

  private $searchText = new BehaviorSubject<string>('');

  constructor() {
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

  setSearchTextFilter(text: string): void {
    this.$searchText.next(text);
  }

  private getMockBlogPosts(): BlogPost[] {
    return [
      {
        id: '1',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '1',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '1',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '1',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '1',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '2',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '3',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
      {
        id: '4',
        title: 'Some title that makes sense',
        image: '/assets/images/triangles-background.jpg',
        body: '  This is some big description; This is some big description; This is some big description; This is some big description; This is some big description;This is some big description; This is some big description',
        createDate: new Date(),
        likes: 0,
      },
    ];
  }
}
