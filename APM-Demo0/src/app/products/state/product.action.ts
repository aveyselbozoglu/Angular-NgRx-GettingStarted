import { createAction, props } from "@ngrx/store";
import { Product } from '../product'

export const toggleProductAction = createAction('[Product] product toggle');

export const setCurrentProduct = createAction('[Product] set current product',
  props<{ product: Product }>());

export const clearCurrentProduct = createAction('[Product] clear current product');

export const initializeCurrentProduct = createAction('[Product] initialize current product');

export const loadProducts = createAction('[Product] load products');

export const loadProductsSuccess = createAction('[Product] load success', props<{ products: Product[] }>());

export const loadProductsFail = createAction('[Product] load fail', props<{ error: string }>());

