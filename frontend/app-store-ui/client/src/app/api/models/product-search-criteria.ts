/* tslint:disable */
/* eslint-disable */
import { ProductCategory } from '../models/product-category';
export interface ProductSearchCriteria {
  guarantee?: string;
  model?: string;
  name?: string;
  price?: string;
  producer?: string;
  productCategory?: ProductCategory;
  quantity?: number;
}
