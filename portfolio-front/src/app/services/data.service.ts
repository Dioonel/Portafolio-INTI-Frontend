import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyData } from './../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<MyData>('./../../assets/data.json');
  }

}
