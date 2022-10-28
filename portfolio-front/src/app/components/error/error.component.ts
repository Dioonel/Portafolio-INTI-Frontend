import { Component, OnInit } from '@angular/core';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private editService: EditService) { }

  ngOnInit(): void {
    scrollTo(0, 0);
    setTimeout(() => {
      this.editService.toggleErrorMsg();
    }, 4000)
  }

}
