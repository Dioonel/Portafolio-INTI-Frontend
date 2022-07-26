import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ProjectsData } from './../../models/data.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectsData!: ProjectsData[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.projectsData = data['projects-data'];
    })
  }

}
