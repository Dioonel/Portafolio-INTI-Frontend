import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { EducationData } from './../../models/data.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  educationData!: EducationData[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.educationData = data['education-data'];
    })
  }

}
