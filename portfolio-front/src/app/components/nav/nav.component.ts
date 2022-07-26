import { Component, OnInit } from '@angular/core';
import { faPalette, faLanguage, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faPalette = faPalette;
  faLanguage = faLanguage;
  faEdit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}
