import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  $projects: Observable<Project[]>;

  constructor(private readonly projectService: ProjectService) {
    this.$projects = this.projectService.$projects;
  }
}
