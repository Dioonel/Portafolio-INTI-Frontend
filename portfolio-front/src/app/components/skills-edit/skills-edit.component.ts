import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { SkillsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { NgModel } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit {
  skillsData!: SkillsData[];
  skillsDataCopy!: SkillsData[];
  addedSkills: SkillsData[] = [];
  deletedSkills: SkillsData[] = [];

  faCheck = faCheck;
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;

  loading = false;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getSkills().subscribe(data => {
      this.skillsData = data;
      this.skillsDataCopy = JSON.parse(JSON.stringify(this.skillsData));     // Se copian los valores del array original para compararlos luego (Este tipo de copia permite crear un nuevo array identico al original, pero evita que se referencien los valores del primero)
    });
  }

  cancelEdit(){
    if(this.addedSkills.length > 0){
      forkJoin(
        this.addedSkills.map(skill => this.dataService.deleteSkill(skill.id)))    // Se eliminan de la BBDD las skills que se crearon pero no se confirmaron
        .subscribe(data => {
        this.addedSkills = [];
        this.deletedSkills = [];
        this.editService.toggleSkillsEdit();
      });
    } else {
      this.editService.toggleSkillsEdit();
    }
  }

  saveEdit(){
    this.loading = true;
    if(this.deletedSkills.length > 0){
      forkJoin(
        this.deletedSkills.map(skill => this.dataService.deleteSkill(skill.id))) // Se eliminan las skills de la BBDD que fueron eliminadas en la vista del cliente
        .subscribe(data => {
          this.saveData();                                            // **
        });
    } else {
      this.saveData();                                               // ** Se actualizan en la BBDD solamente las skills que sufrieron cambio
    }
  }

  changeProgress(event: Event, mySkill: SkillsData){                        // Conecta al input con la progress bar y valida min=0, max=100
    let input = event.target as HTMLInputElement;
    if(parseInt(input.value) < 0){
      input.value = '0';
    }
    if(parseInt(input.value) > 100){
      input.value = '100';
    }
    let index = this.skillsData.findIndex(skill => skill.id === mySkill.id);
    this.skillsData[index] = {...mySkill, value: parseInt(input.value)};
  }

  addSkill(){                                                                       // Se crea una skill en la vista del cliente y en la *BBDD*
    let newSkill: SkillsData = {skill: 'new skill', value: 50};
    this.skillsData.push(newSkill);
    this.addedSkills.push(newSkill);                              // Se guarda temporaneamente por si se cancela la edicion y debe ser eliminada

    this.dataService.postSkill(newSkill).subscribe(data => {
      let index = this.skillsData.findIndex(s => s.id == undefined);
      this.skillsData[index].id = data.id;
    });
  }

  popSkill(id: number | undefined){                                                   // Se elimina una skill de la vista del cliente
    let index = this.skillsData.findIndex(skill => skill.id == id);
    if(index !== -1){
      this.deletedSkills.push(this.skillsData[index]);        // Se guarda temporaneamente para ser eliminada de la BBDD si se confirma la edicion
      this.skillsData.splice(index, 1);
    }
  }

  saveData(){
    if(this.skillsData.length > 0){
      forkJoin(
        [this.skillsData.map(skill => {
          let index = this.skillsData.findIndex(s => s.id == skill.id);
            if(this.skillsDataCopy[index]?.skill != skill.skill || this.skillsDataCopy[index]?.value != skill.value){
              return this.dataService.updateSkill(skill).subscribe(data => {});
            } else {
              return;
            }
          }
        )
        ])
      .subscribe(data => {
        setTimeout(() => {
          this.loading = false;
          this.editService.toggleSkillsEdit();
        }, 1000)
      });
    } else {
      this.loading = false;
      this.editService.toggleSkillsEdit();
    }
  }
}
