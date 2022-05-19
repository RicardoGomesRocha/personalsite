import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BottomMenuService } from 'src/app/bottom-menu/bottom-menu.service';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss'],
})
export class ViewProjectComponent {
  $project: Observable<Project>;
  project: Project | undefined;
  constructor(
    private readonly projectService: ProjectService,
    private route: ActivatedRoute,
    private readonly bottomMenuService: BottomMenuService
  ) {
    this.$project = this.projectService.getProject(
      route.snapshot.paramMap.get('id') || ''
    );
    this.$project.subscribe((project) => (this.project = project));
  }

  openShareMenu() {
    this.bottomMenuService.openBottomMenu([
      {
        icon: 'share',
        lines: ['Facebook'],
        click: () => alert('Share on facebook'),
      },
    ]);
  }
}
