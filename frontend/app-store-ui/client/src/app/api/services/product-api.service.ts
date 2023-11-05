/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { productCreatePost } from '../fn/product-api/product-create-post';
import { ProductCreatePost$Params } from '../fn/product-api/product-create-post';
import { productGetAllGet } from '../fn/product-api/product-get-all-get';
import { ProductGetAllGet$Params } from '../fn/product-api/product-get-all-get';
import { productGetByIdIdIdGet } from '../fn/product-api/product-get-by-id-id-id-get';
import { ProductGetByIdIdIdGet$Params } from '../fn/product-api/product-get-by-id-id-id-get';
import { productUpdateBaseByIdIdIdPut } from '../fn/product-api/product-update-base-by-id-id-id-put';
import { ProductUpdateBaseByIdIdIdPut$Params } from '../fn/product-api/product-update-base-by-id-id-id-put';
import { productUpdateProductWithDetailsPut } from '../fn/product-api/product-update-product-with-details-put';
import { ProductUpdateProductWithDetailsPut$Params } from '../fn/product-api/product-update-product-with-details-put';

@Injectable({ providedIn: 'root' })
export class ProductApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `productCreatePost()` */
  static readonly ProductCreatePostPath = '/product/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productCreatePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCreatePost$Response(params?: ProductCreatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return productCreatePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productCreatePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productCreatePost(params?: ProductCreatePost$Params, context?: HttpContext): Observable<void> {
    return this.productCreatePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `productGetAllGet()` */
  static readonly ProductGetAllGetPath = '/product/getAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productGetAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  productGetAllGet$Response(params?: ProductGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return productGetAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productGetAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productGetAllGet(params?: ProductGetAllGet$Params, context?: HttpContext): Observable<void> {
    return this.productGetAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `productGetByIdIdIdGet()` */
  static readonly ProductGetByIdIdIdGetPath = '/product/getById/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productGetByIdIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  productGetByIdIdIdGet$Response(params: ProductGetByIdIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return productGetByIdIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productGetByIdIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productGetByIdIdIdGet(params: ProductGetByIdIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.productGetByIdIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `productUpdateBaseByIdIdIdPut()` */
  static readonly ProductUpdateBaseByIdIdIdPutPath = '/product/updateBaseById/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productUpdateBaseByIdIdIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productUpdateBaseByIdIdIdPut$Response(params: ProductUpdateBaseByIdIdIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return productUpdateBaseByIdIdIdPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productUpdateBaseByIdIdIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productUpdateBaseByIdIdIdPut(params: ProductUpdateBaseByIdIdIdPut$Params, context?: HttpContext): Observable<void> {
    return this.productUpdateBaseByIdIdIdPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `productUpdateProductWithDetailsPut()` */
  static readonly ProductUpdateProductWithDetailsPutPath = '/product/updateProductWithDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productUpdateProductWithDetailsPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productUpdateProductWithDetailsPut$Response(params?: ProductUpdateProductWithDetailsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return productUpdateProductWithDetailsPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productUpdateProductWithDetailsPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  productUpdateProductWithDetailsPut(params?: ProductUpdateProductWithDetailsPut$Params, context?: HttpContext): Observable<void> {
    return this.productUpdateProductWithDetailsPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
