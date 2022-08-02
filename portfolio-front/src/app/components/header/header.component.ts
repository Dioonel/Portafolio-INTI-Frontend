import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { HeaderData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faEdit = faEdit;
  headerData!: HeaderData;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.headerData = data['header-data'];
    })
  }

  toggleEdit(){
    this.editService.toggleHeaderEdit();
  }

}
