import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { HeaderData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-header-edit',
  templateUrl: './header-edit.component.html',
  styleUrls: ['./header-edit.component.css']
})
export class HeaderEditComponent implements OnInit {
  headerData!: HeaderData;
  faCheck = faCheck;
  faXmark = faXmark;
  bannerHover = false;
  ppHover = false;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getHeader().subscribe(data => {
      this.headerData = data;
    });
  }

  cancelEdit(){
    this.editService.toggleHeaderEdit();
  }

  saveEdit(){
    this.dataService.updateHeader(this.headerData)
    .subscribe(data => {
      this.editService.toggleHeaderEdit();
    });
  }
}
