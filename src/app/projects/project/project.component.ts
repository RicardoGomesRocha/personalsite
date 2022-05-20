import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input()
  project: Project | undefined;

  getBackgroundImage(): string {
    return `url(${this.project?.image})`;
  }
}
