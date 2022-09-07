import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { EducationData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { format, isEqual, parseISO } from 'date-fns';

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
  educationData!: EducationData[];
  addedEducation: EducationData[] = [];
  deletedEducation: EducationData[] = [];
  educationDataCopy!: EducationData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getEducation().subscribe(data => {
      this.educationData = data;
      this.educationDataCopy = JSON.parse(JSON.stringify(this.educationData));
    });
  }

  cancelEdit(){
    if(this.addedEducation.length > 0){
      for(let education of this.addedEducation){
        this.dataService.deleteEducation(education.id).subscribe(data => {});
      }
    }

    setTimeout(() => {
      this.addedEducation = [];
      this.deletedEducation = [];
      this.editService.toggleEducationEdit();
    }, 350);
  }

  saveEdit(){

    if(this.deletedEducation.length > 0){
      for(let delEducation of this.deletedEducation){
        this.dataService.deleteEducation(delEducation.id).subscribe(data => {});
      }
    }


    if(this.educationData.length > 0){
      for(let education of this.educationData){
        let index = this.educationData.findIndex(e => e.id == education.id);
        if(index != -1){
          if(this.educationDataCopy[index]?.title != education.title || this.educationDataCopy[index]?.icon != education.icon || this.educationDataCopy[index].date != education.date){
            education.date = format(parseISO(education.date), 'yyyy-MM-dd');
            this.dataService.updateEducation(education).subscribe(data => {});
          } else {
            continue;
          }
        }
      }
    }

    setTimeout(() => {
      this.addedEducation = [];
      this.deletedEducation = [];
      this.editService.toggleEducationEdit();
    }, 350);
  }

  addEducation(){
    let newEducation: EducationData = {
      title: "New title",
      date: format(new Date(), 'yyyy-MM-dd'),
      icon: './../../../assets/images/template-small-icon.jpg'};
    this.educationData.push(newEducation);
    this.addedEducation.push(newEducation);

    this.dataService.postEducation(newEducation).subscribe(data => {
      let index = this.educationData.findIndex(e => e.id == undefined);
      this.educationData[index].id = data.id;
    });
  }


  popEducation(id: number | undefined){
    let index = this.educationData.findIndex(education => education.id == id);
    if(index != -1){
      this.deletedEducation.push(this.educationData[index]);
      this.educationData.splice(index, 1);
    }
  }
}
