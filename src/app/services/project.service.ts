import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { first, flatMap, Observable, Subscriber } from 'rxjs';
import { Project, ProjectSaveStatus } from '../models';
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

  saveProject(
    project: Project,
    newImage?: File
  ): Observable<ProjectSaveStatus> {
    return new Observable<ProjectSaveStatus>((sub) => {
      if (newImage) {
        this.upload(newImage, project.id).subscribe((value) => {
          if (value.status === UploadStatuses.Complete) {
            if (value.fileUrl) {
              project.image = value.fileUrl;
            }
            sub.next({ percentage: 80 });
            this.setProject(project, sub);
          } else if (value.status === UploadStatuses.Error) {
            sub.error(new Error('Was not possible to upload the image'));
          } else if (value.status === UploadStatuses.Uploading) {
            sub.next({ percentage: value.percentage || 0 });
          }
        });
      } else {
        sub.next({ percentage: 50 });
        this.setProject(project, sub);
      }
    });
  }

  private setProject(project: Project, sub: Subscriber<ProjectSaveStatus>) {
    if (project.id) {
      this.projectsCollection
        .doc(project.id)
        .set(project)
        .then(() => sub.next({ percentage: 100, projectId: project.id }))
        .catch((error) => sub.error(error));
    } else {
      this.projectsCollection.add(project).then(
        (value) => {
          sub.next({ percentage: 100, projectId: value.id });
        },
        (error) => sub.error(error)
      );
    }
  }
}
