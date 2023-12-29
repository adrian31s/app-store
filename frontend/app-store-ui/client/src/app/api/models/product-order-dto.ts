/* tslint:disable */
/* eslint-disable */
import { ProductDto } from '../models/product-dto';
export interface ProductOrderDto {
  bucketId?: number;
  productDTO?: ProductDto;
  quantityProductOrder?: number;
}
