import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  getBlogPosts(): Observable<BlogPost[]> {
    return of([
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
    ]);
  }
}
