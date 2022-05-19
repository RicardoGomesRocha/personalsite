import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss'],
})
export class ViewProjectComponent {
  $project: Observable<Project>;
  constructor(
    private readonly projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.$project = this.projectService.getProject(
      route.snapshot.paramMap.get('id') || ''
    );
  }
}
