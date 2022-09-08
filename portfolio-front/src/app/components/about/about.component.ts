import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { DataService } from './../../services/data.service';
import { AboutData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutData!: AboutData;
  editAuth!: boolean;
  faEdit = faEdit;

  constructor(protected dataService: DataService, protected editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getAbout().subscribe(data => {
      this.aboutData = data;
    });
  }

  toggleEdit(){
    this.editService.toggleAboutEdit();
  }

}
