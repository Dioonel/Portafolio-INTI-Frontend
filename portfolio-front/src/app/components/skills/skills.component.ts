import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { SkillsData } from './../../models/data.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillsData!: SkillsData[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.skillsData = data['skills-data'];
    })
  }

}
