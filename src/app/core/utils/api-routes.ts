import { environment } from '@env/environment.development';

const url = environment.apiUrl;

export class Api {
  static readonly products = `${url}bp/products`;
  static readonly productsById = (id: string) =>
    `${url}bp/products/${id}`;
  static readonly verifyProduct = (id: string) =>
    `${url}bp/products/verification/${id}`;
}
