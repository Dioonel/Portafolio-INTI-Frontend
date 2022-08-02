import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private aboutEdit: boolean = false;
  private aboutEditObs = new BehaviorSubject<boolean>(this.aboutEdit);
  aboutEdit$ = this.aboutEditObs.asObservable();

  constructor() { }

  toggleAboutEdit(){
    this.aboutEdit = !this.aboutEdit;
    this.aboutEditObs.next(this.aboutEdit);
  }
}
