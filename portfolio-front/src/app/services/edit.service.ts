import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private headerEdit: boolean = false;
  private headerEditObs = new BehaviorSubject<boolean>(this.headerEdit);
  headerEdit$ = this.headerEditObs.asObservable();

  private aboutEdit: boolean = false;
  private aboutEditObs = new BehaviorSubject<boolean>(this.aboutEdit);
  aboutEdit$ = this.aboutEditObs.asObservable();

  private skillsEdit: boolean = false;
  private skillsEditObs = new BehaviorSubject<boolean>(this.skillsEdit);
  skillsEdit$ = this.skillsEditObs.asObservable();

  private projectsEdit: boolean = false;
  private projectsEditObs = new BehaviorSubject<boolean>(this.projectsEdit);
  projectsEdit$ = this.projectsEditObs.asObservable();

  private educationEdit: boolean = false;
  private educationEditObs = new BehaviorSubject<boolean>(this.educationEdit);
  educationEdit$ = this.educationEditObs.asObservable();

  constructor() { }

  toggleHeaderEdit(){
    this.headerEdit = !this.headerEdit;
    this.headerEditObs.next(this.headerEdit);
  }

  toggleAboutEdit(){
    this.aboutEdit = !this.aboutEdit;
    this.aboutEditObs.next(this.aboutEdit);
  }

  toggleSkillsEdit(){
    this.skillsEdit = !this.skillsEdit;
    this.skillsEditObs.next(this.skillsEdit);
  }

  toggleProjectsEdit(){
    this.projectsEdit = !this.projectsEdit;
    this.projectsEditObs.next(this.projectsEdit);
  }

  toggleEducationEdit(){
    this.educationEdit = !this.educationEdit;
    this.educationEditObs.next(this.educationEdit);
  }
}
