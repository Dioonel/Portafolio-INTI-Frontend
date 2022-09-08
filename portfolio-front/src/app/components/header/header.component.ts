import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { HeaderData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData!: HeaderData;
  editAuth!: boolean;
  faEdit = faEdit;

  constructor(private dataService: DataService, private editService: EditService) { }

  ngOnInit(): void {
    this.editService.authEdit$.subscribe(status => {
      this.editAuth = status;
    });

    this.dataService.getHeader().subscribe(data => {
      this.headerData = data;
    })
  }

  toggleEdit(){
    this.editService.toggleHeaderEdit();
  }

  imgError(event: Event, type: string){
    let img = event.target as HTMLImageElement;
    if(type === 'banner'){
      img.src = './../../../assets/images/template-banner-icon.png';
    } else {
      img.src = './../../../assets/images/template-user-icon.jpg';
    }
  }
}
