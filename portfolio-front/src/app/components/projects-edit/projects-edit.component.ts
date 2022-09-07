import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;
  projectsData!: ProjectsData[];
  addedProjects: ProjectsData[] = [];
  deletedProjects: ProjectsData[] = [];
  projectsDataCopy!: ProjectsData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projectsData = data;
      this.projectsDataCopy = JSON.parse(JSON.stringify(this.projectsData));
    });
  }

  cancelEdit(){
    if(this.addedProjects.length > 0){
      for(let project of this.addedProjects){
        this.dataService.deleteProject(project.id).subscribe(data => {});
      }
    }

    setTimeout(() => {
      this.addedProjects = [];
      this.deletedProjects = [];
      this.editService.toggleProjectsEdit();
    }, 350);
  }

  saveEdit(){

    if(this.deletedProjects.length > 0){
      for(let delProject of this.deletedProjects){
        this.dataService.deleteProject(delProject.id).subscribe(data => {});
      }
    }


    if(this.projectsData.length > 0){
      for(let project of this.projectsData){
        let index = this.projectsData.findIndex(p => p.id == project.id);
        if(index != -1){
          if(this.projectsDataCopy[index]?.name != project.name || this.projectsDataCopy[index]?.description != project.description || this.projectsDataCopy[index]?.icon != project.icon || this.projectsDataCopy[index]?.link != project.link){
            this.dataService.updateProject(project).subscribe(data => {});
          } else {
            continue;
          }
        }
      }
    }

    setTimeout(() => {
      this.addedProjects = [];
      this.deletedProjects = [];
      this.editService.toggleProjectsEdit();
    }, 350);
  }

  addProject(){
    let newProject: ProjectsData = {
      name: 'New project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
}
