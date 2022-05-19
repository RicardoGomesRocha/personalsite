import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
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
      filter((projects, index) => projects[index].id === id),
      map((project) => project[0])
    );
  }
}
