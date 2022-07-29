import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  private contactStatus: boolean = false;
  private contact = new BehaviorSubject<boolean>(false);

  contact$ = this.contact.asObservable();

  constructor() { }

  toggleContact(){
    this.contactStatus = !this.contactStatus;
    this.contact.next(this.contactStatus);
  }
}
