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
  faEdit = faEdit;
  projectsData!: ProjectsData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.projectsData = data['projects-data'];
    })
  }

  toggleEdit(){
    this.editService.toggleProjectsEdit();
  }
}
