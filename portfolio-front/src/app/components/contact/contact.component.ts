import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogicService } from './../../services/logic.service';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactStatus!: boolean;
  faXmarkCircle = faXmarkCircle;

  @Output() contactChange = new EventEmitter<boolean>();

  constructor(private logicService: LogicService) { }

  ngOnInit(): void {
    this.logicService.contact$.subscribe(status => {
      this.contactStatus = status;
    });
  }

  toggleContact(){
    this.logicService.toggleContact();
    this.contactChange.emit(this.contactStatus);
  }
}
