import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { ImageService } from './../../services/image.service';
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

  loading = false;
  oldIcons: any = [];
  newIcons: any = [];

  constructor(private dataService: DataService, private editService: EditService, private imageService: ImageService) { }   // Este componente aplica la misma logica explicada en los comentarios de skills-edit-component.ts

  ngOnInit(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projectsData = data;
      this.projectsDataCopy = JSON.parse(JSON.stringify(this.projectsData));
      for(let proj of this.projectsDataCopy){
        this.oldIcons.push = {
          id: proj.id,
          icon: proj.icon
        }
      }
    });
  }

  cancelEdit(){
    if(this.newIcons.length > 0){
      for(let icon of this.newIcons){
        let index = this.projectsData.findIndex(proj => proj.id == icon.id);
        if(index != -1){
          this.projectsData[index].icon = icon.icon;
        }
      }
    }

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
    this.loading = true;
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
        setTimeout(() => {
          this.loading = false;
          this.editService.toggleProjectsEdit();
        }, 1000);
      });
    } else {
      this.loading = false
      this.editService.toggleProjectsEdit();
    }
  }

  async getImage(event: Event, id: ProjectsData['id']){
    try{
      let input = event.target as HTMLInputElement;
      if(input.files && input.files.length > 0){
        if(id != undefined){
          this.loading = true;
          let icon: File = input.files[0];

          let obj = {
            id: id,
            icon: await this.imageService.uploadImage(icon)
          };

          this.newIcons.push(obj);

          let index = this.projectsData.findIndex(project => project.id == id);
          if(index != -1){
            this.projectsData[index].icon = obj.icon;
          }

          this.loading = false;
        }
      }
    } catch (err) {
      this.editService.toggleErrorMsg();
      this.editService.toggleProjectsEdit();
    }
  }
}
