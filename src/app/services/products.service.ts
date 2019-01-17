import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
      return this.http.get('/products')
  }
}
