import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from '@dto/product.dto';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  @Input() product!: IProducts;

  formProductGroup: FormGroup<any>;

  idProduct: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _products: ProductsService,
    private route: Router
  ) {
    this.formProductGroup = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });
  }

  ngOnChanges() {
    this.setForm();
  }

  setForm() {
    this.formProductGroup.reset();
    if (this.product) {
      this.formProductGroup.patchValue({
        ...this.product,
      });
      this.formProductGroup.get('id')?.disable();
      this.idProduct = this.product.id;
    }
  }

  onSubmit() {
    this.formProductGroup.markAllAsTouched();
    if (this.formProductGroup.invalid) return;
    if (this.product) {
      console.log('Editing product with ID:', this.product.id);
      // Logic to edit the product can be added here
      this.UpdateProduct();
      return
    }else{

      this.addProduct();
    }
  }

  async UpdateProduct() {
    const formValue = {
      ...this.formProductGroup.value,
      id: this.idProduct,
    };
    const response = await this._products.updateProduct(
      this.idProduct,
      formValue
    );
    if (response) {
      console.log('Product updated successfully:', response);
      this.formProductGroup.reset();
      this.route.navigate(['/']);

    }
  }

  async addProduct() {
    const response = await this._products.addProduct(
      this.formProductGroup.value
    );
    if (response) {
      this.formProductGroup.reset();
      this.route.navigate(['/']);
    }
  }
}
