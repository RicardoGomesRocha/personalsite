import { Injectable } from '@angular/core';
import { first, flatMap, Observable, of } from 'rxjs';
import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  $projects: Observable<Project[]> = of([
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
      id: '2',
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
      id: '3',
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

  getProject(id: string): Observable<Project> {
    return this.$projects.pipe(
      flatMap((projects) => projects),
      first((project) => project.id === id)
    );
  }
}
