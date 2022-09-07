import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { DataService } from './../../services/data.service';
import { EducationData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  editAuth!: boolean;
  faEdit = faEdit;
  educationData!: EducationData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getEducation()
    .subscribe(data => {
      this.educationData = data;
    });
  }

  toggleEdit(){
    this.editService.toggleEducationEdit();
  }
}
