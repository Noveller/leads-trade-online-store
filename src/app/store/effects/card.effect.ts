import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {OrderService} from '../../services/order.service';
import {map, switchMap, withLatestFrom} from 'rxjs/internal/operators';
import {CardModel} from '../models/CardModel';
import {select, Store} from '@ngrx/store';
import {forkJoin} from 'rxjs';

import * as fromCardActions from '../actions/card.action';
import * as fromProducts from '../../../app/store/reducers/products.reducer';
import * as fromCard from '../../../app/store/reducers/card.reducer';

import {ProductModel} from '../models/ProductModel';

import * as fromStore from '../../../app/store/reducers';

@Injectable()
export class CardEffect {

  constructor(private action$: Actions, private store$: Store<fromStore.State>, private order: OrderService) { }

  @Effect()
  load$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.LOAD),
    switchMap(() => {
      return this.order.getAll()
        .pipe(map((orders: CardModel[]) => {
            return new fromCardActions.CardLoadSuccessAction(orders);
        }))
    })
  );

  @Effect()
  addItem$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.ADD_ITEM),
    map((action: fromCardActions.CardAddItemAction) => action.payload),
    switchMap(payload => {
        return this.order.addItem(payload.productId, payload.quantity)
          .pipe(
            withLatestFrom(this.store$.pipe(select(fromProducts.selectProductById(payload.productId)))),
            map(([item, product]: [CardModel, ProductModel]) => {

              item.product = product;

              return new fromCardActions.CardAddItemSuccess(item);
          }))
    })
  );


  @Effect()
  removeItemByProductId$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.REMOVE_ITEM_BY_PRODUCT_ID),
    map((action: fromCardActions.CardRemoveItemByProductIdAction) => action.payload.productId),
    withLatestFrom(this.store$.pipe(select(fromCard.selectAllCards))),
    switchMap(([productId, cards]: [number, CardModel[]]) => {

      const card = cards.find(card => card.productId === productId);

      return this.order.removeItem(card.id)
        .pipe(map(() => {

          return new fromCardActions.CardRemoveItemSuccessAction(card);

        }))

    }));


  @Effect()
  removeItem$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.REMOVE_ITEM),
    map((action: fromCardActions.CardRemoveItemAction) => action.payload),
    switchMap(card => {

      return this.order.removeItem(card.id)
        .pipe(map(() => {

          return new fromCardActions.CardRemoveItemSuccessAction(card);

        }))

    }));

  @Effect()
  updateItem$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.UPDATE_ITEM),
    map((action: fromCardActions.CardUpdateItemAction) => action.payload),
    withLatestFrom(this.store$.pipe(select(fromCard.selectAllCards))),
    switchMap(([data, cards]) => {

      let card = cards.find(card => card.id === data.id);

      console.log(data);

      return this.order.updateItem(data)
        .pipe(map(result => {

          card = {...card, ...data};

          return new fromCardActions.CardUpdateItemSuccessAction(card)

        }))

    })
  );

  @Effect()
  removeAll$ = this.action$.pipe(
    ofType(fromCardActions.CardActionTypes.REMOVE_ALL),
    withLatestFrom(this.store$.pipe(select(fromCard.selectCardIds))),
    switchMap(([_, ids]: [ any, number[] ]) => {

      const observers = ids.map(id => this.order.removeItem(id));

      return forkJoin(observers)
        .pipe(map((data) => {
            return new fromCardActions.CardRemoveAllSuccessAction();
        }));

    })
  )

}
