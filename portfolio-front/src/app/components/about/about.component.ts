import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { AboutData } from './../../models/data.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutData!: AboutData;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData()
    .subscribe(data => {
      this.aboutData = data['about-data'];
    })
  }

}
