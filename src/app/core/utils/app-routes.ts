export class AppRoutes {
  static readonly dashboard = 'dashboard';
  static readonly list_products = 'list-products';
  static readonly product_details = 'product-details';
  static readonly edit_product = (id:string) => `edit/${id}`;
  static readonly create_product = 'add';
}
