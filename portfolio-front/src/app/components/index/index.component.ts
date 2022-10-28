import { Component, OnInit } from '@angular/core';
import { EditService } from './../../services/edit.service';
import { DataService } from './../../services/data.service';

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
  errorMsg!: boolean;
  loading = true;

  constructor(private editService: EditService, private dataService: DataService) { }

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
    });
    this.editService.errorMsg$.subscribe(status => {
      this.errorMsg = status;
    });
    this.dataService.getAbout().subscribe(data => {
      setTimeout(() => {
        this.loading = false;
      }, 750);
    });
  }

  updateBg(){
    this.blurBg = !this.blurBg;
  }
}
