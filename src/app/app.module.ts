import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { MaterialsModule } from './materials.module';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  declarations: [AppComponent, TopMenuComponent, IntroComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
