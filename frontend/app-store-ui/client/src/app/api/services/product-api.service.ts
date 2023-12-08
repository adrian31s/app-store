/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Charger } from '../models/charger';
import { ChargerDto } from '../models/charger-dto';
import { Cooler } from '../models/cooler';
import { CoolerDto } from '../models/cooler-dto';
import { createProduct } from '../fn/product-api/create-product';
import { CreateProduct$Params } from '../fn/product-api/create-product';
import { DramMemory } from '../models/dram-memory';
import { DramMemoryDto } from '../models/dram-memory-dto';
import { getProductById } from '../fn/product-api/get-product-by-id';
import { GetProductById$Params } from '../fn/product-api/get-product-by-id';
import { getProducts } from '../fn/product-api/get-products';
import { GetProducts$Params } from '../fn/product-api/get-products';
import { GraphicCard } from '../models/graphic-card';
import { GraphicCardDto } from '../models/graphic-card-dto';
import { HardDrive } from '../models/hard-drive';
import { HardDriveDto } from '../models/hard-drive-dto';
import { Motherboard } from '../models/motherboard';
import { MotherboardDto } from '../models/motherboard-dto';
import { PcCase } from '../models/pc-case';
import { PcCaseDto } from '../models/pc-case-dto';
import { Processor } from '../models/processor';
import { ProcessorDto } from '../models/processor-dto';
import { ProductCategory } from '../models/product-category';
import { ProductDto } from '../models/product-dto';
import { ProductOrder } from '../models/product-order';
import { updateProductBaseById } from '../fn/product-api/update-product-base-by-id';
import { UpdateProductBaseById$Params } from '../fn/product-api/update-product-base-by-id';
import { updateProductWithDetailsById } from '../fn/product-api/update-product-with-details-by-id';
import { UpdateProductWithDetailsById$Params } from '../fn/product-api/update-product-with-details-by-id';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createProduct()` */
  static readonly CreateProductPath = '/product/create';

  /**
   * create product
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct$Response(params?: CreateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>> {
    return createProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * create product
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct(params?: CreateProduct$Params, context?: HttpContext): Observable<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}> {
    return this.createProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>): {
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
} => r.body)
    );
  }

  /** Path part for operation `getProducts()` */
  static readonly GetProductsPath = '/product/getAll';

  /**
   * get all products
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts$Response(params?: GetProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductDto>>> {
    return getProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * get all products
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProducts(params?: GetProducts$Params, context?: HttpContext): Observable<Array<ProductDto>> {
    return this.getProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>): Array<ProductDto> => r.body)
    );
  }

  /** Path part for operation `getProductById()` */
  static readonly GetProductByIdPath = '/product/getById/id/{id}';

  /**
   * get product by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById$Response(params: GetProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'productOrders'?: Array<ProductOrder>;
'charger'?: Charger;
'cooler'?: Cooler;
'dramMemory'?: DramMemory;
'graphicCard'?: GraphicCard;
'hardDrive'?: HardDrive;
'motherboard'?: Motherboard;
'pcCase'?: PcCase;
'processor'?: Processor;
'thumbnailAsByte'?: string;
'picturesAsBytes'?: string;
}>> {
    return getProductById(this.http, this.rootUrl, params, context);
  }

  /**
   * get product by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById(params: GetProductById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'productOrders'?: Array<ProductOrder>;
'charger'?: Charger;
'cooler'?: Cooler;
'dramMemory'?: DramMemory;
'graphicCard'?: GraphicCard;
'hardDrive'?: HardDrive;
'motherboard'?: Motherboard;
'pcCase'?: PcCase;
'processor'?: Processor;
'thumbnailAsByte'?: string;
'picturesAsBytes'?: string;
}> {
    return this.getProductById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'productOrders'?: Array<ProductOrder>;
'charger'?: Charger;
'cooler'?: Cooler;
'dramMemory'?: DramMemory;
'graphicCard'?: GraphicCard;
'hardDrive'?: HardDrive;
'motherboard'?: Motherboard;
'pcCase'?: PcCase;
'processor'?: Processor;
'thumbnailAsByte'?: string;
'picturesAsBytes'?: string;
}>): {
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'productOrders'?: Array<ProductOrder>;
'charger'?: Charger;
'cooler'?: Cooler;
'dramMemory'?: DramMemory;
'graphicCard'?: GraphicCard;
'hardDrive'?: HardDrive;
'motherboard'?: Motherboard;
'pcCase'?: PcCase;
'processor'?: Processor;
'thumbnailAsByte'?: string;
'picturesAsBytes'?: string;
} => r.body)
    );
  }

  /** Path part for operation `updateProductBaseById()` */
  static readonly UpdateProductBaseByIdPath = '/product/updateBaseById/id/{id}';

  /**
   * update product base attributes by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProductBaseById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductBaseById$Response(params: UpdateProductBaseById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>> {
    return updateProductBaseById(this.http, this.rootUrl, params, context);
  }

  /**
   * update product base attributes by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProductBaseById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductBaseById(params: UpdateProductBaseById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}> {
    return this.updateProductBaseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>): {
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
} => r.body)
    );
  }

  /** Path part for operation `updateProductWithDetailsById()` */
  static readonly UpdateProductWithDetailsByIdPath = '/product/updateProductWithDetails';

  /**
   * update product with details by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProductWithDetailsById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductWithDetailsById$Response(params?: UpdateProductWithDetailsById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>> {
    return updateProductWithDetailsById(this.http, this.rootUrl, params, context);
  }

  /**
   * update product with details by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProductWithDetailsById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductWithDetailsById(params?: UpdateProductWithDetailsById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}> {
    return this.updateProductWithDetailsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
}>): {
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
} => r.body)
    );
  }

}
