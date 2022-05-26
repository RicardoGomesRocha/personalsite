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
  forkJoin,
  map,
  Observable,
  Subscriber,
  take,
} from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { Project, ProjectSaveStatus } from '../models';
import { Category } from '../models/category';
import { UploadStatus, UploadStatuses } from '../models/upload';
import { Search, SearchableService } from '../search/search.model';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements SearchableService {
  $projects: Observable<Project[]>;
  $searchResults: Observable<Search[]>;
  private $searchText = new BehaviorSubject<string>('');
  private projectsCollection: AngularFirestoreCollection<Project>;

  constructor(
    private readonly afs: AngularFirestore,
    private readonly uploadService: UploadService,
    private readonly categoriesService: CategoriesService
  ) {
    this.projectsCollection = afs.collection<Project>('projects');
    this.$projects = new Observable<Project[]>((sub) => {
      this.projectsCollection
        .valueChanges({
          idField: 'id',
        })
        .subscribe((projects) => {
          const projectsObservable = new Array<Observable<Category[]>>();
          for (let project of projects) {
            if (project.categoriesRefs) {
              projectsObservable.push(
                this.categoriesService
                  .getCategoriesFromDocumentReference(
                    project.categoriesRefs as any
                  )
                  .pipe(take(1))
              );
            }
          }
          if (projectsObservable.length > 0) {
            const observable = forkJoin(projectsObservable);
            observable.subscribe((categoriesMatrix) => {
              for (let i = 0; i < projects.length; i++) {
                projects[i].categories = categoriesMatrix[i];
              }
              sub.next(projects);
            });
          } else {
            sub.next(projects);
          }
        });
    });

    this.$searchResults = combineLatest([
      this.$projects,
      this.$searchText,
    ]).pipe(
      map((value: [Project[], string]) => {
        const projects = value[0];
        const searchText = value[1];
        return projects
          .filter(
            (project) =>
              project.title.toLowerCase().includes(searchText.toLowerCase()) ||
              project.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              project.smallDescription
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )
          .map((project) => {
            return {
              type: 'Project',
              title: project.title,
              text: [project.smallDescription, project.description],
              image: project.image,
              link: `/projects/${project.id}/`,
              categories: ['', ''],
            } as Search;
          });
      })
    );
  }

  setSearchTextFilter(text: string): void {
    this.$searchText.next(text);
  }

  upload(file: File, projectId: string): Observable<UploadStatus> {
    return this.uploadService.upload(`projects/${projectId}`, file, 'image');
  }

  getProject(id: string): Observable<Project> {
    return this.$projects.pipe(
      flatMap((projects) => projects),
      first((project) => project.id === id)
    );
  }

  deleteImage(projectId: string): Observable<any> {
    return this.uploadService.deleteFile(`/projects/${projectId}/image.png`);
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

  setLikes(projectId: string, likes: number) {
    this.projectsCollection.doc(projectId).update({
      likes,
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
