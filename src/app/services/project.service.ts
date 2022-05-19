import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, flatMap, Observable } from 'rxjs';
import { Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  $projects: Observable<Project[]>;
  private projectsCollection: AngularFirestoreCollection<Project>;

  constructor(private readonly afs: AngularFirestore) {
    this.projectsCollection = afs.collection<Project>('projects');
    this.$projects = this.projectsCollection.valueChanges({
      idField: 'id',
    });
  }

  getProject(id: string): Observable<Project> {
    return this.$projects.pipe(
      flatMap((projects) => projects),
      first((project) => project.id === id)
    );
  }
}
