import { Component, OnInit } from '@angular/core';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  blurBg = false;
  aboutEdit!: boolean;

  constructor(private editService: EditService) { }

  ngOnInit(): void {
    this.editService.aboutEdit$.subscribe(status => {
      this.aboutEdit = status;
    });
  }

  updateBg(){
    this.blurBg = !this.blurBg;
  }
}
