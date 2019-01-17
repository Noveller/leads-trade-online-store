import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
import {CardModel} from '../models/CardModel';
import {sortBySeqNo} from './helpers/index';
import * as fromCardActions from '../actions/card.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<CardModel> {
  selectedId: number | null,
  loading: boolean;
  loaded: boolean
}

export const adapter: EntityAdapter<CardModel> = createEntityAdapter<CardModel>({
  selectId: (product: CardModel) => product.id,
  sortComparer: sortBySeqNo
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  loading: false,
  loaded: false
});

export function reducer(state = initialState, action: fromCardActions.ActionsUnion) {
  switch (action.type) {

    case fromCardActions.CardActionTypes.LOAD: {
      return { ...state, loading: true, loaded: false }
    }

    case fromCardActions.CardActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload, { ...state, loaded: true, loading: false });
    }

    case fromCardActions.CardActionTypes.ADDED_ITEM_SUCCESS: {
      return adapter.addOne(action.payload, state);
    }

    case fromCardActions.CardActionTypes.REMOVE_ITEM_BY_PRODUCT_ID: {
      return {...state, loading: true}
    }

    case fromCardActions.CardActionTypes.REMOVE_ITEM_SUCCESS: {

      return adapter.removeOne(action.payload.id, state);

    }


    case fromCardActions.CardActionTypes.UPDATE_ITEM_SUCCESS: {

      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);

      // return {...state, loading: false};
    }

    case fromCardActions.CardActionTypes.REMOVE_ALL_SUCCESS: {
      return adapter.removeAll(state)
    }

    default: {
      return state;
    }
  }
}
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotal
} = adapter.getSelectors();

export const getCardsState = createFeatureSelector<State>(
  'card'
);

export const getEntityById = (id: number) => (state: EntityState<CardModel>) => state.entities[id];

export const getSelectedCardId = (state: State) => state.selectedId;
export const getCardLoaded = (state: State) => state.loaded;


export const selectCardIds = createSelector(getCardsState, getIds);

export const selectCardEntities = createSelector(
  getCardsState,
  getEntities
);

export const selectAllCards = createSelector(
  getCardsState,
  getAll
);

export const selectCardById = (id: number) => createSelector(selectAllCards, (cards) => {

  return cards.find(card => card.id === id);

});


export const selectTotalCards = createSelector(
  getCardsState,
  getTotal
);

export const selectCardsLoaded = createSelector(
  getCardsState,
  getCardLoaded
);

export const selectCardByProductId = (productId: number) => createSelector(
  selectAllCards,
  (cards: CardModel[]) => {
    return cards.find(card => card.productId === productId);
  }
);

export const selectTotalPrice = createSelector(
  selectAllCards,
  cards => {

    let total = 0;

    cards.forEach(card => {
        total = total + card.quantity * card.product.price;
    });

      return total;
  }
);


