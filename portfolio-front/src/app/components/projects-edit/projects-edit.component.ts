import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
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
    this.editService.toggleProjectsEdit();
  }

}
