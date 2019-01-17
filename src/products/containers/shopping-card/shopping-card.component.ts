import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/index';
import {CardModel} from '../../../app/store/models/CardModel';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../app/store/reducers';
import * as fromCardReducers from '../../../app/store/reducers/card.reducer';
import * as fromCardActions from '../../../app/store/actions/card.action';
import * as fromProductActions from '../../../app/store/actions/products.action';

@Component({
  selector: 'app-shopping-card',
  template: `
      
    <ng-container *ngIf="(cards$ | async) as cards">
      <div class="row">
        <div class="col-xs-6">
          <div class="form-group">
            <a [routerLink]="['/products']" class="btn btn-default">К списку продуктов</a>
          </div>
        </div>
        <div class="col-xs-6 text-right" *ngIf="cards.length">
          <div class="form-group">
            <button class="btn btn-default" (click)="buyProduct($event)">Купить всё</button>
          </div>
        </div>
        <div class="col-xs-12" *ngIf="!cards.length">
          <div class="form-group">
            <div class="alert alert-danger">
              Вы ничего не добавли в корзину.
            </div>
          </div>
        </div>
        
        <div class="col-xs-12" *ngIf="cards.length">
          <div class="form-group text-right">
              <b>Итого к оплате: {{totalPrice$ | async}}$</b>
          </div>
        </div>
      </div>
    
      <ul class="list-group">

        <app-shopping-card-item
          *ngFor="let card of cards; trackBy:custom"
          [card]="card"
          (change_quantity)="onChangeQuantity($event)"
          (remove)="onRemove($event)">
        </app-shopping-card-item>

      </ul>

      <div class="row" *ngIf="cards.length > 5">
        <div class="col-xs-12">
          <div class="form-group">
            <a [routerLink]="['/products']" class="btn btn-default">К списку продуктов</a>
          </div>
        </div>
      </div>
    </ng-container>
    


  `,
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  public cards$: Observable<CardModel[]>;
  public totalPrice$: Observable<number | any>;

  constructor(public store$: Store<fromStore.State>) { }


  onChangeQuantity($event: {id: number, quantity: number}): void {
    this.store$.dispatch(new fromCardActions.CardUpdateItemAction($event))
  }

  onRemove($event): void {
    this.store$.dispatch(new fromCardActions.CardRemoveItemAction($event))
  }

  buyProduct($event) {
    this.store$.dispatch(new fromProductActions.ProductBuyProducts())
  }

  custom(index,item){
    return index;
  }

  ngOnInit() {
    this.cards$ = this.store$.pipe(select(fromCardReducers.selectAllCards));

    this.totalPrice$ = this.store$.pipe(select(fromCardReducers.selectTotalPrice));

  }

}
