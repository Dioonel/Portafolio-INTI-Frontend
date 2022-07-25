import { Component } from '@angular/core';
import { faPalette, faLanguage, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faPalette = faPalette;
  faLanguage = faLanguage;
  faEdit = faEdit;
}
