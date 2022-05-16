import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: PortfolioComponent },
  { path: 'blog/:id', component: BlogPostComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
