import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromCard from '../../store/reducers/card.reducer'
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-shopping-basket',
  template: `
    
    
    <ng-container *ngIf="(total$ | async) as total">
        <ng-container *ngIf="total">
          <div class="input-group">
            <button [routerLink]="['/products/shopping-card']" aria-describedby="addon" class="btn btn-default">Shopping card <i class="text-warning glyphicon glyphicon-shopping-cart"></i></button>

            <span class="input-group-addon" id="addon">All goods <b>{{total}}</b></span>
          </div>
        </ng-container>
    </ng-container>

    
  `,
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent implements OnInit {

  public total$: Observable<number>;

  constructor(private store$: Store<fromCard.State>) { }

  ngOnInit() {
    this.total$ = this.store$.pipe(select(fromCard.selectTotalCards));

  }

}
