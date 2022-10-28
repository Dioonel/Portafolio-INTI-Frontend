import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataService } from './../../services/data.service';
import { HeaderData } from './../../models/data.model';
import { EditService } from './../../services/edit.service';
import { ImageService } from 'src/app/services/image.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-header-edit',
  templateUrl: './header-edit.component.html',
  styleUrls: ['./header-edit.component.css']
})
export class HeaderEditComponent implements OnInit {
  headerData!: HeaderData;
  faCheck = faCheck;
  faXmark = faXmark;

  loading = false;
  bannerHover = false;
  ppHover = false;

  newBanner: string = '';
  newPp: string = '';
  oldBanner: string = '';
  oldPp: string = '';

  constructor(private dataService: DataService, private editService: EditService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.dataService.getHeader().subscribe(data => {
      this.headerData = data;
      this.oldBanner = this.headerData.banner;
      this.oldPp = this.headerData.pp;
    });
  }

  cancelEdit(){
    this.headerData.banner = this.oldBanner;
    this.headerData.pp = this.oldPp;
    this.editService.toggleHeaderEdit();
  }

  saveEdit(){
    this.loading = true;
    this.dataService.updateHeader(this.headerData).subscribe(data => {
      this.loading = false;
      this.editService.toggleHeaderEdit();
    });
  }

  async getImage(event: Event, type: string){
    try{
      let input = event.target as HTMLInputElement;
      if(input.files && input.files.length > 0){
        if(type === 'banner'){
          this.loading = true;
          let banner: File = input.files[0];
          this.newBanner = await this.imageService.uploadImage(banner);
          this.headerData.banner = this.newBanner;
          this.loading = false;
        } else {
          this.loading = true;
          let pp: File = input.files[0];
          this.newPp = await this.imageService.uploadImage(pp);
          this.headerData.pp = this.newPp;
          this.loading = false;
        }
      }
    } catch (err) {
      this.editService.toggleErrorMsg();
      this.editService.toggleHeaderEdit();
    }
  }
}
