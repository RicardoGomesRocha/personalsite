import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    title: new FormControl(''),
    createdOn: new FormControl(''),
    smallDescription: new FormControl(''),
    description: new FormControl(''),
    backgroundImage: new FormControl(''),
  });

  $project: Observable<Project>;
  projectId: string = '';

  image: File | undefined;

  constructor(
    private readonly projectService: ProjectService,
    private route: ActivatedRoute,
    private routeService: RouteService
  ) {
    this.$project = this.projectService.getProject(
      route.snapshot.paramMap.get('id') || ''
    );
    this.$project.subscribe((project) => this.setFormField(project));
  }

  setFormField(project: Project) {
    this.projectId = project.id;
    this.projectForm.setValue({
      title: project.title,
      createdOn: '',
      smallDescription: '',
      description: '',
      backgroundImage: '',
    });
  }

  save() {
    const project = this.getProjectFromFormField();
    project.id = this.projectId;
    this.projectService
      .setProject(project)
      .subscribe(() => this.routeService.navigate(['/projects', project.id]));
  }

  private getProjectFromFormField(): Project {
    return this.projectForm.value as Project;
  }
}
