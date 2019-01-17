import {Action} from '@ngrx/store';
import {ProductModel} from '../models/ProductModel';

export enum ProductActionTypes {
  LOAD = '[Product] Load',
  LOAD_SUCCESS = '[Product] Load Success',
  LOAD_FAILED = '[Product] Load Failed',
  BUY_PRODUCTS = '[Product] Buy',
}

export class ProductLoadAction implements Action {
  readonly type = ProductActionTypes.LOAD;
}

export class ProductLoadSuccessAction implements Action {
  readonly type = ProductActionTypes.LOAD_SUCCESS;
  constructor(public payload: ProductModel[]) {}
}

export class ProductLoadFailedAction implements Action {
  readonly type = ProductActionTypes.LOAD_FAILED;
  constructor(public payload: any) {}
}

export class ProductBuyProducts implements Action {
  readonly type = ProductActionTypes.BUY_PRODUCTS;
}

export type ActionsUnion =
  | ProductLoadAction
  | ProductLoadSuccessAction
  | ProductLoadFailedAction
  | ProductBuyProducts;
