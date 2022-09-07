import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutEditComponent } from './components/about-edit/about-edit.component';
import { AutosizeModule } from 'ngx-autosize';
import { SkillsEditComponent } from './components/skills-edit/skills-edit.component';
import { EducationEditComponent } from './components/education-edit/education-edit.component';
import { ProjectsEditComponent } from './components/projects-edit/projects-edit.component';
import { HeaderEditComponent } from './components/header-edit/header-edit.component';

import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    LoginComponent,
    IndexComponent,
    ContactComponent,
    AboutEditComponent,
    SkillsEditComponent,
    EducationEditComponent,
    ProjectsEditComponent,
    HeaderEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AutosizeModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
