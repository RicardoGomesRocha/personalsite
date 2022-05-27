import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/admin/admin.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { UsersComponent } from './users/users.component';

// More about auth guards here: https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogPostComponent },
  {
    path: 'project/create',
    component: EditProjectComponent,
    data: {
      mode: 'create',
    },
  },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ViewProjectComponent },
  {
    path: 'projects/:id/edit',
    component: EditProjectComponent,
    data: {
      mode: 'edit',
    },
  },

  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['']) },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => hasCustomClaim('admin') },
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
