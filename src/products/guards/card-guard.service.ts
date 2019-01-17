import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';

import * as fromCardReducer from '../../app/store/reducers/card.reducer'
import * as fromCardAction from '../../app/store/actions/card.action'

import {Observable, of} from 'rxjs/index';
import {catchError, filter, switchMap, take, tap} from 'rxjs/internal/operators';

@Injectable()
export class CardGuardService implements CanActivate {

  constructor(private store$: Store<fromCardReducer.State>) { }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  private checkStore(): Observable<boolean> {
    return this.store$.pipe(select(fromCardReducer.selectCardsLoaded)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store$.dispatch(new fromCardAction.CardLoadAction())
        }
      }),
      filter(loaded => loaded),
      take(1)
    )
  }
}
