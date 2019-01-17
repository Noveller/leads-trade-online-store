import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '../../../app/store/models/ProductModel';
import {select, Store} from '@ngrx/store';
import * as fromCard from '../../../app/store/reducers/card.reducer';
import {Observable} from 'rxjs/index';
import {CardModel} from '../../../app/store/models/CardModel';

@Component({
  selector: 'app-product-item',
  template: `
    <div class="col-xs-6 col-sm-3 col-md-2">
      <div class="thumbnail">
        <img [src]="product.image" [alt]="product.description">
        <div class="caption">
          <h3 [innerHTML]="product.title"></h3>
          <p><b>{{product.price}}$</b></p>
          <p [innerHTML]="product.description"></p>
      
          <p>
            <ng-container *ngIf="product_card$ | async; else newDeb" >
              <button class="btn btn-warning" role="button" (click)="removeFromCard($event)">Remove <i class="glyphicon glyphicon-trash"></i></button>

            </ng-container>
            <ng-template #newDeb>
              <button class="btn btn-default" role="button" (click)="addToCard($event)">Add <i class="glyphicon glyphicon-plus"></i></button>
            </ng-template>
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() public product: ProductModel;

  @Output() public add_to_card: EventEmitter<ProductModel> = new EventEmitter();
  @Output() public remove_from_card: EventEmitter<ProductModel> = new EventEmitter();

  public product_card$: Observable<CardModel>;

  constructor(private store$: Store<fromCard.State>) {}

  addToCard($event) {
      this.add_to_card.emit(this.product);
  }

  removeFromCard($event) {
      this.remove_from_card.emit(this.product);
  }

  ngOnInit() {

    this.product_card$ = this.store$.pipe(select(fromCard.selectCardByProductId(this.product.id)))

  }

}
