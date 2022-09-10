import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { NgModel } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {
  projectsData!: ProjectsData[];
  projectsDataCopy!: ProjectsData[];
  addedProjects: ProjectsData[] = [];
  deletedProjects: ProjectsData[] = [];
  faCheck = faCheck;
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private dataService: DataService, private editService: EditService) { }   // Este componente aplica la misma logica explicada en los comentarios de skills-edit-component.ts

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projectsData = data;
      this.projectsDataCopy = JSON.parse(JSON.stringify(this.projectsData));
    });
  }

  cancelEdit(){
    if(this.addedProjects.length > 0){
      forkJoin(
        this.addedProjects.map(project => this.dataService.deleteProject(project.id)))
        .subscribe(data => {
        this.addedProjects = [];
        this.deletedProjects = [];
        this.editService.toggleProjectsEdit();
      });
    } else {
      this.editService.toggleProjectsEdit();
    }
  }

  saveEdit(){
    if(this.deletedProjects.length > 0){
      forkJoin(
        this.deletedProjects.map(project => this.dataService.deleteProject(project.id)))
        .subscribe(data => {
          this.saveData();
        });
    } else {
      this.saveData();
    }
  }

  addProject(){
    let newProject: ProjectsData = {
      name: 'New project',
      description: '',
      icon: './../../../assets/images/template-small-icon.jpg',
      link: ''
    }
    this.projectsData.push(newProject);
    this.addedProjects.push(newProject);

    this.dataService.postProject(newProject).subscribe(data => {
      let index = this.projectsData.findIndex(p => p.id == undefined);
      this.projectsData[index].id = data.id;
    });
  }

  popProject(id: number | undefined){
    let index = this.projectsData.findIndex(project => project.id == id);
    if(index != -1){
      this.deletedProjects.push(this.projectsData[index]);
      this.projectsData.splice(index, 1);
    }
  }

  saveData(){
    if(this.projectsData.length > 0){
      forkJoin(
        [this.projectsData.map(project => {
          let index = this.projectsData.findIndex(p => p.id == project.id);
            if(this.projectsDataCopy[index]?.name != project.name || this.projectsDataCopy[index]?.description != project.description || this.projectsDataCopy[index]?.icon != project.icon || this.projectsDataCopy[index]?.link != project.link){
              return this.dataService.updateProject(project).subscribe(data => {});
            } else {
              return;
            }
          }
        )
      ])
      .subscribe(data => {
        this.dataService.getProjects().subscribe(data => this.editService.toggleProjectsEdit());
      });
    } else {
      this.editService.toggleProjectsEdit();
    }
  }
}
