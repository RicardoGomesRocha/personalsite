import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs';
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
    categories: new FormControl(''),
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

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // dropdown with defaults from theme
      [{ align: [] }],
      ['link'],
    ],
  };

  keywords = new Set(['angular', 'how-to', 'tutorial']);

  constructor(
    private readonly projectService: ProjectService,
    private route: ActivatedRoute,
    private routeService: RouteService
  ) {
    this.editMode = route.snapshot.data['mode'] === 'edit' ? true : false;
    if (this.editMode) {
      this.$project = this.projectService.getProject(
        route.snapshot.paramMap.get('id') || ''
      );
      this.$project.subscribe((project) => this.setFormField(project));
    }
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
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
