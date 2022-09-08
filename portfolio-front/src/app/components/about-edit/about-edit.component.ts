import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { AboutData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';


@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.css']
})
export class AboutEditComponent implements OnInit{
  aboutData!: AboutData;
  faCheck = faCheck;
  faXmark = faXmark;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.dataService.getAbout().subscribe(data => {
      this.aboutData = data;
    });
  }

  cancelEdit(){
    this.editService.toggleAboutEdit();
  }

  saveEdit(){
    this.dataService.updateAbout(this.aboutData).subscribe(data => {
      this.editService.toggleAboutEdit();
    });
  }

}
