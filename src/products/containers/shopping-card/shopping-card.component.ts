import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/index';
import {CardModel} from '../../../app/store/models/CardModel';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../app/store/reducers';
import * as fromCardReducers from '../../../app/store/reducers/card.reducer';
import * as fromCardActions from '../../../app/store/actions/card.action';
import * as fromProductActions from '../../../app/store/actions/products.action';
import {OrderFormComponent} from '../order-form/order-form.component';

import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-shopping-card',
  entryComponents: [OrderFormComponent],
  template: `
      
    <ng-container *ngIf="(cards$ | async) as cards">
      <div class="row">
        <div class="col-xs-6">
          <div class="form-group">
            <a [routerLink]="['/products']" class="btn btn-default">To product list</a>
          </div>
        </div>
        <div class="col-xs-6 text-right" *ngIf="cards.length">
          <div class="form-group">
            <button class="btn btn-default" (click)="buyProducts($event)">Checkout</button>
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
              <b>Total for payment: {{totalPrice$ | async}}$</b>
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
            <a [routerLink]="['/products']" class="btn btn-default">To product list</a>
          </div>
        </div>
      </div>
    </ng-container>
    


  `,
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  public bsModalRef: BsModalRef;

  public cards$: Observable<CardModel[]>;
  public totalPrice$: Observable<number | any>;

  constructor(public store$: Store<fromStore.State>, private modalService: BsModalService) { }


  onChangeQuantity($event: {id: number, quantity: number}): void {
    this.store$.dispatch(new fromCardActions.CardUpdateItemAction($event))
  }

  onRemove($event): void {
    this.store$.dispatch(new fromCardActions.CardRemoveItemAction($event))
  }

  buyProducts($event) {

    const initialState = {
      title: 'Order'
    };

    this.bsModalRef = this.modalService.show(OrderFormComponent, {initialState});

    console.log(this.bsModalRef);

    this.bsModalRef.content.closeBtnName = 'Close';


    this.bsModalRef.content.submit.subscribe(data => {

      this.bsModalRef.hide();

      this.store$.dispatch(new fromProductActions.ProductBuyProducts());
    });


    // this.store$.dispatch(new fromProductActions.ProductBuyProducts())
  }

  custom(index,item){
    return index;
  }

  ngOnInit() {
    this.cards$ = this.store$.pipe(select(fromCardReducers.selectAllCards));

    this.totalPrice$ = this.store$.pipe(select(fromCardReducers.selectTotalPrice));

  }

}
