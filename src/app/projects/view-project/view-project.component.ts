import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { ProjectService } from 'src/app/services/project.service';
import { ShareService } from 'src/app/services/share.service';

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
    private readonly shareService: ShareService
  ) {
    this.$project = this.projectService.getProject(
      route.snapshot.paramMap.get('id') || ''
    );
    this.$project.subscribe((project) => (this.project = project));
  }

  openShareMenu() {
    this.shareService.share('Im a page :)', window.location.href);
  }

  addLike() {
    if (this.project) {
      if (!this.project.likes) this.project.likes = 0;
      this.projectService.setLikes(this.project.id, ++this.project.likes);
    }
  }
}
