import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { DataService } from './../../services/data.service';
import { SkillsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsData!: SkillsData[];
  editAuth!: boolean;
  faEdit = faEdit;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getSkills().subscribe(data => {
      this.skillsData = data;
    });
  }

  toggleEdit(){
    this.editService.toggleSkillsEdit();
  }
}
