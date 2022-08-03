import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { SkillsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;
  skillsData!: SkillsData[];
  idMock: number = 5;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.skillsData = data['skills-data'];
    });
  }

  cancelEdit(){
    this.editService.toggleSkillsEdit();
  }

  saveEdit(){
    // wip
    console.log(this.skillsData);
    this.editService.toggleSkillsEdit();
  }

  changeProgress(event: Event, mySkill: SkillsData){
    let input = event.target as HTMLInputElement;
    let index = this.skillsData.findIndex(skill => skill.id === mySkill.id);
    this.skillsData[index] = {...mySkill, value: parseInt(input.value)};
  }

  addSkill(){
    this.skillsData.push({id: this.idMock, skill: 'new skill', value: 50});
    this.idMock++;
    console.log(this.skillsData);
  }

  popSkill(id: number){
    let index = this.skillsData.findIndex(skill => skill.id === id);
    this.skillsData.splice(index, 1);
  }
}
