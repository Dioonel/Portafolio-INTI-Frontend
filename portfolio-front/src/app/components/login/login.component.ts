import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DataService } from './../../services/data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.username, this.password);
    this.dataService.login(this.username, this.password)
    .subscribe(data => {
      if(data !== null){
        sessionStorage.setItem('jwt', data);
        location.href = '';
      }
    });
  }
}
