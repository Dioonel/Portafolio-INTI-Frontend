import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { EducationData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { format, parseISO } from 'date-fns';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {
  educationData!: EducationData[];
  educationDataCopy!: EducationData[];
  addedEducation: EducationData[] = [];
  deletedEducation: EducationData[] = [];
  faCheck = faCheck;
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private dataService: DataService, private editService: EditService) { }        // Este componente aplica la misma logica explicada en los comentarios de skills-edit-component.ts

  ngOnInit(): void {
    this.dataService.getEducation().subscribe(data => {
      this.educationData = data;
      this.educationDataCopy = JSON.parse(JSON.stringify(this.educationData));
    });
  }

  cancelEdit(){
    if(this.addedEducation.length > 0){
      forkJoin(
        this.addedEducation.map(education => this.dataService.deleteEducation(education.id)))
        .subscribe(data => {
        this.addedEducation = [];
        this.deletedEducation = [];
        this.editService.toggleEducationEdit();
      });
    } else {
      this.editService.toggleEducationEdit();
    }
  }

  saveEdit(){
    if(this.deletedEducation.length > 0){
      forkJoin(
        this.deletedEducation.map(education => this.dataService.deleteEducation(education.id)))
        .subscribe(data => {
          this.saveData();
        });
    } else {
      this.saveData();
    }
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

  saveData(){
    if(this.educationData.length > 0){
      forkJoin(
        [this.educationData.map(education => {
          let index = this.educationData.findIndex(e => e.id == education.id);
            if(this.educationDataCopy[index]?.title != education.title || this.educationDataCopy[index]?.icon != education.icon || this.educationDataCopy[index].date != education.date){
              education.date = format(parseISO(education.date), 'yyyy-MM-dd');        // Se formatea la fecha para que coincida con lo esperado en el backend
              return this.dataService.updateEducation(education).subscribe(data => {});
            } else {
              return;
            }
          }
        )
      ])
      .subscribe(data => {
        this.dataService.getEducation().subscribe(data => this.editService.toggleEducationEdit());
      });
    } else {
      this.editService.toggleEducationEdit();
    }
  }
}
