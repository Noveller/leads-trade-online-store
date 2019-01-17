import {ProductModel} from './ProductModel';

export interface CardModel {
  id: number;
  productId: number;
  quantity: number;
  product: ProductModel;
}
