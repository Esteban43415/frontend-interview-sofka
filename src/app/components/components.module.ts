import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MsgValidationComponent } from './msg-validation/msg-validation.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';

const COMPONENTS = [
  ProductFormComponent,
  MsgValidationComponent,
  DropdownComponent,
];

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [],
})
export class ComponentsModule {}
