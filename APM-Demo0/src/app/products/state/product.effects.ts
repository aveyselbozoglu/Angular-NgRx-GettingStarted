import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, exhaustMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import * as ProductAction from './product.action'

@Injectable()
export class ProductEffects {

  constructor(private action$: Actions, private productService: ProductService) { }

  loadProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProductAction.loadProducts),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductAction.loadProductsSuccess({ products })),
        catchError(error => of(ProductAction.loadProductsFail({ error })))
      ))
    )

  })

  updateProduct$ = createEffect(() => {

    return this.action$.pipe(
      ofType(ProductAction.updateProduct),
      concatMap(action =>
        this.productService.updateProduct(action.product).pipe(
          map(product => ProductAction.updateProductSuccess({ product })),
          catchError(error => of(ProductAction.updateProductFail({ error })))
        ))
    )
  })





}