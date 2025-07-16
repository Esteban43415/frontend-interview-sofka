import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';

const COMPONENTS = [ProductFormComponent];

@NgModule({
  imports: [],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [],
})
export class ComponentsModule {}
