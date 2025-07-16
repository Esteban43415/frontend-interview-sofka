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
}
