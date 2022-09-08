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
  educationData!: EducationData[];
  editAuth!: boolean;
  faEdit = faEdit;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getEducation().subscribe(data => {
      this.educationData = data;
    });
  }

  toggleEdit(){
    this.editService.toggleEducationEdit();
  }

  imgError(event: Event){
    let img = event.target as HTMLImageElement;
    img.src = './../../../assets/images/template-education-icon.png';
  }
}
