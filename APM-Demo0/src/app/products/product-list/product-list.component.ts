import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getShowProductCode, getCurrentProduct, getProducts, State, getError } from '../state/product.reducer';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private productService: ProductService, private store: Store<State>) { }

  ngOnInit(): void {

    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    )

    this.store.dispatch(ProductActions.loadProducts());

    this.errorMessage$ = this.store.select(getError)

    this.products$ = this.store.select(getProducts);

    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductAction())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }))
  }

}
