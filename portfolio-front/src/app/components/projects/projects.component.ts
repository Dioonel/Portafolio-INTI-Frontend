import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsData!: ProjectsData[];
  editAuth!: boolean;
  faEdit = faEdit;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getProjects().subscribe(data => {
      this.projectsData = data;
    })
  }

  toggleEdit(){
    this.editService.toggleProjectsEdit();
  }

  imgError(event: Event){
    let img = event.target as HTMLImageElement;
    img.src = './../../../assets/images/template-project-icon.png';
  }
}
