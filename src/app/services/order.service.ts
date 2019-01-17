import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {CardModel} from '../store/models/CardModel';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get('/order?_expand=product');
  }

  public addItem(productId: number, quantity: number = 1): Observable<CardModel> {
    return this.http.post<CardModel>('/order', {productId, quantity});
  }

  public removeItem(order_id: number): Observable<any> {
    return this.http.delete(`/order/${order_id}`);
  }

  public updateItem(card: {id: number, quantity: number}): Observable<any> {
      return this.http.patch(`/order/${card.id}`, {
        quantity: card.quantity
      })
  }

  public removeAll(ids: number[]): Observable<any> {
    return this.http.delete(`/order/${ids.join(',')}`)
  }


}
