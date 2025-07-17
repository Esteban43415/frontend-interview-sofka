import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@utils/api-routes';
import { lastValueFrom } from 'rxjs';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private _toast: ToastService) { }

  async getAllProducts() {
    try {
      const response = await lastValueFrom<any>(this.http.get(Api.products));
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }

  async getProductById(id: string) {
    try {
      const response = await lastValueFrom<any>(
        this.http.get(`${Api.productsById(id)}`)
      );
      if (response) {
        this._toast.show('Producto obtenido con éxito', 'success');
      }
      return response;
    } catch (error) {
      this._toast.show('Error al obtener producto', 'error');
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }

  async verifyProduct(id: string) {
    try {
      const response = await lastValueFrom<any>(
        this.http.get(Api.verifyProduct(id))
      )
      return response
    } catch (error) {
      this._toast.show('Error al obtener producto', 'error');
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }

  async addProduct(product: any) {
    try {
      const response = await lastValueFrom<any>(
        this.http.post(Api.products, product)
      );
      if (response) {
        this._toast.show(response.message, 'success');
      }
      return response;
    } catch (error) {
      this._toast.show('Error al crear producto', 'error');
      console.error('Error adding product:', error);
      return null;
    }
  }

  async updateProduct(id: string, product: any) {
    try {
      const response = await lastValueFrom<any>(
        this.http.put(Api.productsById(id), product)
      );
      if (response) {
        this._toast.show('Producto actualizado con éxito', 'success');
      }
      return response;
    } catch (error) {
      this._toast.show('Error al actualizar producto', 'error');
      console.error('Error updating product:', error);
      return null;
    }
  }

  async deleteProduct(id: string) {
    try {
      const response = await lastValueFrom<any>(
        this.http.delete(Api.productsById(id))
      );
      if (response) {
        this._toast.show('Producto eliminado con éxito', 'success');
      }
      return response;
    } catch (error) {
      this._toast.show('Error eliminando producto', 'error');
      console.error('Error deleting product:', error);
      return null;
    }
  }
}
