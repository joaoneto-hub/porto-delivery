
export interface Product {
  name: string;
  price: number;
  description?: string;
  userId: string;
}
export interface ProductUpdate {
  name?: string;
  price?: number;
  description?: string;
}
