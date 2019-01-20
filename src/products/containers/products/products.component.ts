import {AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import {ProductsService} from '../../../app/services/products.service';
import {select, Store} from '@ngrx/store';

import * as fromProducts from '../../../app/store/reducers/products.reducer';
import * as fromCard from '../../../app/store/reducers/card.reducer';

import * as fromCardActions from '../../../app/store/actions/card.action';
import {ProductModel} from '../../../app/store/models/ProductModel';
import {Observable} from 'rxjs/index';
import {OrderService} from '../../../app/services/order.service';
import {CardModel} from '../../../app/store/models/CardModel';
import {ProductItemComponent} from '../product-item/product-item.component';

@Component({
  selector: 'app-products',
  template: `
      
    <div class="row">
      <app-product-item
        *ngFor="let product of products$ | async" 
        [product]="product"
        (add_to_card)="onAddToCard($event)"
        (remove_from_card)="onRemoveFromCard($event)"
      ></app-product-item>
    </div>
    
  `,
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, AfterViewInit {


  public products$: Observable<ProductModel[]>;

  constructor(
    private store: Store<fromCard.State>,
    private product: ProductsService
  ) {}

  public onAddToCard($event: ProductModel): void {

    this.store.dispatch(new fromCardActions.CardAddItemAction({
      productId: $event.id
    }))
  }

  public onRemoveFromCard($event: CardModel) {

    this.store.dispatch(new fromCardActions.CardRemoveItemByProductIdAction({
      productId: $event.id
    }));


  }

  ngOnInit() {

    this.products$ = this.store.pipe(select(fromProducts.selectAllProducts));

  }

  ngAfterViewInit() {
  }

}
