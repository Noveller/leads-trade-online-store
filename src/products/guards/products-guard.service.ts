import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';

import * as fromProductReducer from '../../app/store/reducers/products.reducer'
import * as fromProductAction from '../../app/store/actions/products.action'

import {Observable, of} from 'rxjs/index';
import {catchError, filter, switchMap, take, tap} from 'rxjs/internal/operators';

@Injectable()
export class ProductsGuardService implements CanActivate {

  constructor(private store$: Store<fromProductReducer.State>) { }

  canActivate(): Observable<boolean> {
      return this.checkStore().pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      )
  }

  private checkStore(): Observable<boolean> {
    return this.store$.pipe(select(fromProductReducer.selectProductsLoaded)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store$.dispatch(new fromProductAction.ProductLoadAction())
        }
      }),
      filter(loaded => loaded),
      take(1)
    )
  }
}
