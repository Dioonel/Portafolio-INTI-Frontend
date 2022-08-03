import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
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
  faPlus = faPlus;
  faMinus = faMinus;
  idMock: number = 4
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
    console.log(this.educationData);
    this.editService.toggleEducationEdit();
  }

  addEducation(){
    this.educationData.push({id: this.idMock,
      title: "Title / Certificate / Career / Course",
      date: '2022, August',
      icon: 'https://icon-library.com/images/not-found-icon/not-found-icon-28.jpg'});
    this.idMock++;
  }

  popEducation(id: number){
    let index = this.educationData.findIndex(education => education.id === id);
    this.educationData.splice(index, 1);
  }
}
