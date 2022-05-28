import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as hljs from 'highlight.js';
import { QuillModule } from 'ngx-quill';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostViewComponent } from './blog/blog-post-view/blog-post-view.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SocialMediaComponent } from './contacts/social-media/social-media.component';
import { HomeBlogPostsComponent } from './home/home-blog-posts/home-blog-posts.component';
import { HomeFooterComponent } from './home/home-footer/home-footer.component';
import { HomeProjectsComponent } from './home/home-projects/home-projects.component';
import { HomeComponent } from './home/home.component';
import { ImageComponent } from './image/image.component';
import { UploadImageComponent } from './image/upload-image/upload-image.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { MaterialsModule } from './materials.module';
import { PhotoComponent } from './photo/photo.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { SearchComponent } from './search/search.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

hljs.default.configure({
  languages: ['html', 'css', 'scss', 'typescript'],
});

export * from 'highlight.js';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    IntroComponent,
    HomeComponent,
    PhotoComponent,
    HomeProjectsComponent,
    ProjectComponent,
    BlogPostComponent,
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
    EditProjectComponent,
    BottomMenuComponent,
    UploadImageComponent,
    ImageComponent,
    CategoriesComponent,
    TextEditorComponent,
    BlogComponent,
    BlogPostViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    QuillModule.forRoot(),
    MatChipsModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
