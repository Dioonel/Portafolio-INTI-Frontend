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
  faEdit = faEdit;
  aboutData!: AboutData;

  constructor(protected dataService: DataService, protected editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.aboutData = data['about-data'];
    });
  }

  toggleEdit(){
    this.editService.toggleAboutEdit();
  }

}
