import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '@dto/product.dto';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  idProduct: string = '';

  product!: IProducts;

  constructor(
    private activeRoute: ActivatedRoute,
    private _products: ProductsService
  ) {
    const id = this.activeRoute.snapshot.params['id'];
    if (id) {
      this.idProduct = id;
      this.loadProduct(id);
    }
  }

  async loadProduct(id: string) {
    const product = await this._products.getProductById(id);
    if (product) {
      this.product = product;
    }
  }
}
