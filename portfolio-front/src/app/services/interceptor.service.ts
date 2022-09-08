import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('jwt');
    if(token !== null && token !== '' && token !== 'null'){
      let reqAuth = req.clone({
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(reqAuth);
    }
    return next.handle(req);
  }

}
