import { createReducer, on, createAction, createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state'

import * as ProductAction from '../state/product.action'
import { act } from "@ngrx/effects";


export interface State extends AppState.State {
  products: ProductState
}

export interface ProductState {
  showProductCode: boolean
  currentProduct: Product
  products: Product[]
  error: string
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products')

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode)

export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct)

export const getProducts = createSelector(getProductFeatureState, state => state.products)

export const getError = createSelector(getProductFeatureState, state => state.error)

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductAction.toggleProductAction, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductAction.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product
    }
  }),
  on(ProductAction.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    }
  }),
  on(ProductAction.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 100,
        description: 'Deneme',
        productCode: 'D',
        productName: 'd2',
        starRating: 3
      }
    }
  }),
  on(ProductAction.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductAction.loadProductsFail, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  })
);
