import { createAction, props } from "@ngrx/store";
import { Product } from '../product'

export const toggleProductAction = createAction('[Product] product toggle');

export const setCurrentProduct = createAction('[Product] set current product',
  props<{ currentProductId: number }>());

export const clearCurrentProduct = createAction('[Product] clear current product');

export const initializeCurrentProduct = createAction('[Product] initialize current product');

export const loadProducts = createAction('[Product] load products');

export const loadProductsSuccess = createAction('[Product] load success', props<{ products: Product[] }>());

export const loadProductsFail = createAction('[Product] load fail', props<{ error: string }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>())

export const updateProductSuccess = createAction('[Product] Update success', props<{ product: Product }>())

export const updateProductFail = createAction('[Product] Update Fail', props<{ error: string }>())

export const createProduct = createAction('[Product] Create Product', props<{ product: Product }>())