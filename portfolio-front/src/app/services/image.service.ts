import { Injectable } from '@angular/core';
import { ImgurResponse } from './../models/data.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private url: string = 'https://api.imgur.com/3/image';
  private clientId: string = '51cdd2973b8c966';

  constructor(private http:HttpClient) { }

  async uploadImage(imageFile: File){
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    let header = new HttpHeaders({
      "Authorization": `Client-ID ${this.clientId}`,
      'skip': 'true'
    });

    const response = await this.http.post<ImgurResponse>(this.url, formData, {headers: header}).toPromise();
    return response?.data.link;
  }
}
