import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home-projects',
  templateUrl: './home-projects.component.html',
  styleUrls: ['./home-projects.component.scss'],
})
export class HomeProjectsComponent {
  $projects: Observable<Project[]>;

  constructor(private readonly projectService: ProjectService) {
    this.$projects = this.projectService.$projects;
  }
}
