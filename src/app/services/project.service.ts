import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, flatMap, Observable } from 'rxjs';
import { Project } from '../models';
import { UploadStatus, UploadStatuses } from '../models/upload';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  $projects: Observable<Project[]>;
  private projectsCollection: AngularFirestoreCollection<Project>;

  constructor(
    private readonly afs: AngularFirestore,
    private readonly uploadService: UploadService
  ) {
    this.projectsCollection = afs.collection<Project>('projects');
    this.$projects = this.projectsCollection.valueChanges({
      idField: 'id',
    });
  }

  upload(file: File, projectId: string): Observable<UploadStatus> {
    return this.uploadService.upload(`project/${projectId}/${file.name}`, file);
  }

  getProject(id: string): Observable<Project> {
    return this.$projects.pipe(
      flatMap((projects) => projects),
      first((project) => project.id === id)
    );
  }

  saveProject(project: Project, newImage?: File): Observable<void> {
    return new Observable<void>((sub) => {
      if (newImage) {
        this.upload(newImage, project.id).subscribe((value) => {
          if (value.status === UploadStatuses.Complete) {
            if (value.fileUrl) {
              project.image = value.fileUrl;
            }

            this.projectsCollection
              .doc(project.id)
              .set(project)
              .then(() => sub.next())
              .catch((error) => sub.error(error));
          } else if (value.status === UploadStatuses.Error) {
            sub.error(new Error('Was not possible to upload the image'));
          }
        });
      }
    });
  }
}
