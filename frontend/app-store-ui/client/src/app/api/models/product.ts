/* tslint:disable */
/* eslint-disable */
import { Charger } from '../models/charger';
import { Cooler } from '../models/cooler';
import { DramMemory } from '../models/dram-memory';
import { GraphicCard } from '../models/graphic-card';
import { HardDrive } from '../models/hard-drive';
import { Motherboard } from '../models/motherboard';
import { PcCase } from '../models/pc-case';
import { Processor } from '../models/processor';
import { ProductCategory } from '../models/product-category';
import { ProductOrder } from '../models/product-order';
export interface Product {
  bid?: number;
  charger?: Charger;
  cooler?: Cooler;
  dramMemory?: DramMemory;
  graphicCard?: GraphicCard;
  guarantee?: string;
  hardDrive?: HardDrive;
  model?: string;
  motherboard?: Motherboard;
  name?: string;
  pcCase?: PcCase;
  pictures?: string;
  picturesAsBytes?: string;
  price?: number;
  processor?: Processor;
  producer?: string;
  productCategory?: ProductCategory;
  productOrders?: Array<ProductOrder>;
  quantity?: number;
  rate?: number;
  thumbnail?: string;
  thumbnailAsByte?: string;
}
