import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models';
import { UserService } from 'src/app/users/users.services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  @Input()
  project: Project | undefined;

  $showAdminOptions = this.usersService.hasRoles(['admin']);

  constructor(private readonly usersService: UserService) {}

  getBackgroundImage(): string {
    return `url(${this.project?.image})`;
  }
}
