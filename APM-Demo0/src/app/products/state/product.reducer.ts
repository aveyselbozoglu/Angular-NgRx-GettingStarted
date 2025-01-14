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
  currentProductId: number | null
  products: Product[]
  error: string
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products')

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode)

export const getCurrentProductId = createSelector(getProductFeatureState, state => state.currentProductId)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? state.products.find(x => x.id === currentProductId) : null
    }
  })

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
      currentProductId: action.currentProductId
    }
  }),
  on(ProductAction.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductAction.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
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
  }),
  on(ProductAction.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map(x => action.product.id === x.id ? action.product : x)
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductAction.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  })
);
