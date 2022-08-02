import { Component, OnInit } from '@angular/core';
import { faCheck, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { SkillsData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;
  skillsData!: SkillsData[];

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.skillsData = data['skills-data'];
    });
  }

  cancelEdit(){
    this.editService.toggleSkillsEdit();
  }

  saveEdit(){
    // wip
    this.editService.toggleSkillsEdit();
  }
}
