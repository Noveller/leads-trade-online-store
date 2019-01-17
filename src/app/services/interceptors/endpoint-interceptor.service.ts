import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointInterceptorService implements HttpInterceptor {

  constructor() {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${environment.api}${request.url}`;

    request = request.clone({
      url: url
    });

    return next.handle(request);
  }


}
