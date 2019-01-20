import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';

import {map, switchMap, withLatestFrom} from 'rxjs/internal/operators';

import {ProductsService} from '../../services/products.service';
import {ProductModel} from '../models/ProductModel';

import * as fromProductActions from '../actions/products.action';
import * as fromRouterActions from '../actions/router.action';
import * as fromCardActions from '../actions/card.action';

import * as fromStore from '../reducers';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class ProductsEffect {

  constructor(
    private actions$: Actions,
    private store$: Store<fromStore.State>,
    private product: ProductsService,
    private notifier: NotifierService
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(fromProductActions.ProductActionTypes.LOAD),
    switchMap(() => {
      return this.product.getAll()
        .pipe(map((products: ProductModel[]) => {

            this.notifier.notify('success', 'Products loaded.');

            return new fromProductActions.ProductLoadSuccessAction(products)
        }))
    })
  );

  @Effect()
  buy$ = this.actions$.pipe(
    ofType(fromProductActions.ProductActionTypes.BUY_PRODUCTS),
    switchMap((data) => {
      // return new

      this.notifier.notify('success', 'Products purchased.');

      return [
        new fromCardActions.CardRemoveAllAction(),
        new fromRouterActions.Go({
          path: ['/products']
        })
      ];

    })
  );

}
