import {Action} from '@ngrx/store';
import {CardModel} from '../models/CardModel';

export enum CardActionTypes {
  LOAD = '[Card] Load',
  LOAD_SUCCESS = '[Card] Load Success',
  LOAD_FAILED = '[Card] Load Failed',
  ADD_ITEM = '[Card] Add Item',
  ADDED_ITEM_SUCCESS = '[Card] Added Item Success',
  REMOVE_ITEM_BY_PRODUCT_ID = '[Card] Remove Item By Product Id',
  REMOVE_ITEM_BY_PRODUCT_ID_SUCCESS = '[Card] Remove Item By Product Id Success',

  REMOVE_ITEM = '[Card] Remove Item',
  REMOVE_ITEM_SUCCESS = '[Card] Remove Item Success',

  UPDATE_ITEM = '[Card] Update Item',
  UPDATE_ITEM_SUCCESS = '[Card] Update Item Success',

  REMOVE_ALL = '[Card] Remove All',
  REMOVE_ALL_SUCCESS = '[Card] Remove All Success',
}

export class CardLoadAction implements Action {
  readonly type = CardActionTypes.LOAD;
}

export class CardLoadSuccessAction implements Action {
  readonly type = CardActionTypes.LOAD_SUCCESS;
  constructor(public payload: CardModel[]) {}
}

export class CardLoadFailedAction implements Action {
  readonly type = CardActionTypes.LOAD_FAILED;
  constructor(public payload: any) {}
}

export class CardAddItemAction implements Action {
  readonly type = CardActionTypes.ADD_ITEM;

  constructor(public payload: {productId: number, quantity?: number}) {}

}

export class CardAddItemSuccess implements Action {
    readonly type = CardActionTypes.ADDED_ITEM_SUCCESS;

    constructor(public payload: CardModel) {}
}

export class CardRemoveItemByProductIdAction implements Action {
  readonly type = CardActionTypes.REMOVE_ITEM_BY_PRODUCT_ID;

  constructor(public payload: { productId: number }) {}
}

export class CardRemoveItemByProductIdSuccessAction implements Action {
  readonly type = CardActionTypes.REMOVE_ITEM_BY_PRODUCT_ID_SUCCESS;

  constructor(public payload: CardModel) {}
}

export class CardRemoveItemAction implements Action {
  readonly type = CardActionTypes.REMOVE_ITEM;

  constructor(public payload: CardModel) {}
}

export class CardRemoveItemSuccessAction implements Action {
  readonly type = CardActionTypes.REMOVE_ITEM_SUCCESS;

  constructor(public payload: CardModel) {}
}

export class CardUpdateItemAction implements Action {
  readonly type = CardActionTypes.UPDATE_ITEM;

  constructor(public payload: {id: number, quantity: number}) {}
}

export class CardUpdateItemSuccessAction implements Action {
  readonly type = CardActionTypes.UPDATE_ITEM_SUCCESS;

  constructor(public payload: CardModel) {}
}

export class CardRemoveAllAction implements Action {
  readonly type = CardActionTypes.REMOVE_ALL;
}

export class CardRemoveAllSuccessAction implements Action {
  readonly type = CardActionTypes.REMOVE_ALL_SUCCESS;
}

export type ActionsUnion =
  | CardLoadAction
  | CardLoadSuccessAction
  | CardLoadFailedAction
  | CardAddItemAction
  | CardAddItemSuccess
  | CardRemoveItemByProductIdAction
  | CardRemoveItemByProductIdSuccessAction
  | CardRemoveItemAction
  | CardRemoveItemSuccessAction
  | CardUpdateItemAction
  | CardUpdateItemSuccessAction
  | CardRemoveAllAction
  | CardRemoveAllSuccessAction;
