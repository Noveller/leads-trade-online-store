import {InjectionToken} from '@angular/core';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

import * as fromProduct from './products.reducer';
import * as fromCard from './card.reducer';

import {storeFreeze} from 'ngrx-store-freeze';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  products: fromProduct.State;
  card: fromCard.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}


export const TOKEN = new InjectionToken<ActionReducerMap<State>>('AppReducers');

export function getReducers(): ActionReducerMap<State> {
  return {
    products: fromProduct.reducer,
    card: fromCard.reducer,
    routerReducer: fromRouter.routerReducer
  };
}

export const reducerProvider = [
  { provide: TOKEN, useFactory: getReducers }
];

export const metaReducers: MetaReducer<State>[] = [storeFreeze];



export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const {queryParams} = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while (state.firstChild) {
      state = state.firstChild;
    }

    const {params} = state;

    return {url, queryParams, params};
  }
}
