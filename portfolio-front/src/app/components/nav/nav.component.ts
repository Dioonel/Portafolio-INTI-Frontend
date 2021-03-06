import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogicService } from './../../services/logic.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private contactStatus!: boolean;

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
