import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MsgValidationComponent } from './msg-validation/msg-validation.component';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ToastComponent } from './toast/toast.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

const COMPONENTS = [
  ProductFormComponent,
  MsgValidationComponent,
  DropdownComponent,
  ToastComponent,
];

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, OverlayModule, PortalModule],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [],
})
export class ComponentsModule {}
