import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return of([
      {
        id: '1',
        title: 'Wow! Project.',
        backgroundImage: '/assets/images/triangles-background.jpg',
        smallDescription: 'This is a small description',
        description:
          'This is some description. For fully example, I need to had some html!',
        createdDate: new Date(),
        likes: 0,
        shares: 0,
      },
      {
        id: '1',
        title: 'Wow! Project.',
        backgroundImage: '/assets/images/triangles-background.jpg',
        smallDescription: 'This is a small description',
        description:
          'This is some description. For fully example, I need to had some html!',
        createdDate: new Date(),
        likes: 0,
        shares: 0,
      },
      {
        id: '1',
        title: 'Wow! Project.',
        backgroundImage: '/assets/images/triangles-background.jpg',
        smallDescription: 'This is a small description',
        description:
          'This is some description. For fully example, I need to had some html!',
        createdDate: new Date(),
        likes: 0,
        shares: 0,
      },
    ]);
  }
}
