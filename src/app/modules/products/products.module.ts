import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductRoting } from './products.routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ComponentsModule } from '@components/components.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    RouterModule.forChild(ProductRoting),
    ComponentsModule,
  ],
  declarations: [ListProductsComponent, AddProductComponent],
  exports: [ListProductsComponent, AddProductComponent],
  providers: [],
})
export class ProductsModule {}
