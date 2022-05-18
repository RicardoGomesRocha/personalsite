import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialMediaComponent } from './contacts/social-media/social-media.component';
import { HomeBlogPostComponent } from './home/home-blog-posts/home-blog-post/home-blog-post.component';
import { HomeBlogPostsComponent } from './home/home-blog-posts/home-blog-posts.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { HomeProjectsComponent } from './home/home-projects/home-projects.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { MaterialsModule } from './materials.module';
import { PhotoComponent } from './photo/photo.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { SearchComponent } from './search/search.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    IntroComponent,
    HomeComponent,
    PhotoComponent,
    HomeProjectsComponent,
    ProjectComponent,
    HomeBlogPostComponent,
    HomeBlogPostsComponent,
    ViewProjectComponent,
    SearchComponent,
    BlogPostComponent,
    HomeFooterComponent,
    ContactsComponent,
    SocialMediaComponent,
    SideBarComponent,
    LoginComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatMenuModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
