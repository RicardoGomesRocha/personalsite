import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models';

@Component({
  selector: 'app-home-project',
  templateUrl: './home-project.component.html',
  styleUrls: ['./home-project.component.scss'],
})
export class HomeProjectComponent {
  @Input()
  project: Project | undefined;

  getBackgroundImage(): string {
    return `url(${this.project?.backgroundImage})`;
  }
}
