import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { EducationData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  educationData!: EducationData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.educationData = data['education-data'];
    });
  }

  cancelEdit(){
    this.editService.toggleEducationEdit();
  }

  saveEdit(){
    // wip
    this.editService.toggleEducationEdit();
  }

}
