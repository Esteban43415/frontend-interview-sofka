import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@utils/api-routes';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

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
      return response;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  }

  async addProduct(product: any) {
    try {
      const response = await lastValueFrom<any>(
        this.http.post(Api.products, product)
      );
      return response;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  async updateProduct(id: string, product: any) {
    try {
      const response = await lastValueFrom<any>(
        this.http.put(Api.productsById(id), product)
      );
      return response;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }
}
