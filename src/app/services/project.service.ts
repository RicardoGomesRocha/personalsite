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
        name: 'Wow! Project.',
        backgroundImage: '',
        smallDescription: 'This is a small description',
        description:
          'This is some description. For fully example, I need to had some html!',
      },
    ]);
  }
}
