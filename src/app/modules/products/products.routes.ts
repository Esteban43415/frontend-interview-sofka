import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { AppRoutes } from '@utils/app-routes';
import { AddProductComponent } from './add-product/add-product.component';

export const ProductRoting: Routes = [
  {
    path: '',
    component: ListProductsComponent,
    data: {
      title: 'Lista de productos',
      urls: [{ title: 'Lista de productos', url: `/${AppRoutes.dashboard}` }],
    },
  },
  {
    path: 'add',
    component: AddProductComponent,
    data: {
      title: 'Agregar producto',
      urls: [
        {
          title: 'Agregar producto',
          url: `/${AppRoutes.dashboard}/products/add`,
        },
      ],
    },
  },
  {
    path: 'edit/:id',
    component: AddProductComponent,
    data: {
      title: 'Editar producto',
      urls: [
        {
          title: 'Editar producto',
          url: `/${AppRoutes.dashboard}/products/edit/:id`,
        },
      ],

    },
  },
];
