import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ProductModel} from '../models/ProductModel';
import {sortBySeqNo} from './helpers/index';
import * as fromProductActions from '../actions/products.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface State extends EntityState<ProductModel> {
  selectedId: number | null,
  loading: boolean;
  loaded: boolean
}

export const adapter: EntityAdapter<ProductModel> = createEntityAdapter<ProductModel>({
  selectId: (product: ProductModel) => product.id,
  sortComparer: sortBySeqNo
});

export const initialState: State = adapter.getInitialState({
    selectedId: null,
    loading: false,
    loaded: false
});

export function reducer(state = initialState, action: fromProductActions.ActionsUnion) {
  switch (action.type) {

    case fromProductActions.ProductActionTypes.LOAD: {
      return { ...state, loading: true, loaded: false };
    }

    case fromProductActions.ProductActionTypes.LOAD_SUCCESS: {
      return adapter.addAll(action.payload, { ...state, loaded: true, loading: false });
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

export const getProductsState = createFeatureSelector<State>(
  'products'
);

export const getEntityById = (id: string) => (state: EntityState<ProductModel>) => state.entities[id];

export const getSelectedProductId = (state: State) => state.selectedId;
export const getProductLoaded = (state: State) => state.loaded;

export const selectProductEntities = createSelector(
  getProductsState,
  getEntities
);

export const selectAllProducts = createSelector(
  getProductsState,
  getAll
);

export const selectProductsLoaded = createSelector(
  getProductsState,
  getProductLoaded
);


export const selectProductById = (id: number) => createSelector(
  selectAllProducts,
  (products: ProductModel[]) => {
    return products.find(product => product.id === id);
  }
);
