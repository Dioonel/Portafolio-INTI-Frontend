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
  idMock: number = 3;
  projectsData!: ProjectsData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.projectsData = data['projects-data'];
    })
  }

  cancelEdit(){
    this.editService.toggleProjectsEdit();
  }

  saveEdit(){
    // wip
    console.log(this.projectsData);
    this.editService.toggleProjectsEdit();
  }

  addProject(){
    this.projectsData.push({id: this.idMock,
      name: 'New project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: 'https://icon-library.com/images/not-found-icon/not-found-icon-28.jpg',
      link: 'https://www.google.com'});
    this.idMock++;
  }


  popProject(id: number){
    let index = this.projectsData.findIndex(project => project.id === id);
    this.projectsData.splice(index, 1);
  }

}
