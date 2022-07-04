import { createReducer, on, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state'


export interface State extends AppState.State {
  products: ProductState
}

export interface ProductState {
  showProductCode: boolean
  currentProduct: Product
  products: Product[]
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products')

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode)

export const getProducts = createSelector(getProductFeatureState, state => state.products)

export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct)

export const productReducer = createReducer<ProductState>(
  initialState,
  on(createAction('[Product] toggle product code'), (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);