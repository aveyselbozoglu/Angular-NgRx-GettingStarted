import { createReducer, on, createAction } from "@ngrx/store";
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