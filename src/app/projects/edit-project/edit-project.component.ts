import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';
import { RouteService } from 'src/app/services/route.service';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent {
  projectForm = new FormGroup({
    title: new FormControl(''),
    createdOn: new FormControl(''),
    smallDescription: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  $project: Observable<Project> | undefined;

  projectId: string = '';

  imageUrl: string | undefined;

  newImage: File | undefined;

  isLoading = false;

  loadingPercentage = 0;

  editMode = false;

  project: Project | undefined;

  constructor(
    private readonly projectService: ProjectService,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private readonly categoriesService: CategoriesService
  ) {
    this.editMode = route.snapshot.data['mode'] === 'edit' ? true : false;
    if (this.editMode) {
      this.$project = this.projectService.getProject(
        route.snapshot.paramMap.get('id') || ''
      );
      this.$project.subscribe((project) => this.setFormField(project));
    }
  }

  setFormField(project: Project) {
    this.projectId = project.id;
    this.imageUrl = project.image;
    this.projectForm.setValue({
      title: project.title || '',
      createdOn: project.createdOn || null,
      smallDescription: project.smallDescription || '',
      description: project.description || '',
      image: project.image || '',
    });
    this.project = project;
  }

  save() {
    const project = this.getProjectFromFormField();
    project.id = this.projectId;
    project.modifiedDate = new Timestamp(new Date().getMilliseconds(), 0);
    project.categoriesRefs =
      this.categoriesService.getDocumentReferenceFromCategories(
        this.project?.categories
      );
    this.isLoading = true;
    this.projectService.saveProject(project, this.newImage).subscribe(
      (value) => {
        if (value.percentage === 100) {
          this.routeService.navigate(['/projects', value.projectId]);
        }
        this.loadingPercentage = value.percentage;
      },
      () => {
        this.loadingPercentage = 0;
        this.isLoading = false;
      }
    );
  }

  private getProjectFromFormField(): Project {
    return this.projectForm.value as Project;
  }
}
