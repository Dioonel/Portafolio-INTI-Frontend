import { Component, OnInit } from '@angular/core';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  blurBg = false;
  headerEdit!: boolean;
  aboutEdit!: boolean;
  skillsEdit!: boolean;
  projectsEdit!: boolean;
  educationEdit!: boolean;

  constructor(private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEditCheck();
    this.editService.headerEdit$.subscribe(status => {
      this.headerEdit = status;
    });
    this.editService.aboutEdit$.subscribe(status => {
      this.aboutEdit = status;
    });
    this.editService.skillsEdit$.subscribe(status => {
      this.skillsEdit = status;
    });
    this.editService.projectsEdit$.subscribe(status => {
      this.projectsEdit = status;
    });
    this.editService.educationEdit$.subscribe(status => {
      this.educationEdit = status;
    })
  }

  updateBg(){
    this.blurBg = !this.blurBg;
  }
}
