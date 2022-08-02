import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { HeaderData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-header-edit',
  templateUrl: './header-edit.component.html',
  styleUrls: ['./header-edit.component.css']
})
export class HeaderEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  headerData!: HeaderData;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.headerData = data['header-data'];
    });
  }

  cancelEdit(){
    this.editService.toggleHeaderEdit();
  }

  saveEdit(){
    // wip
    this.editService.toggleHeaderEdit();
  }

}
