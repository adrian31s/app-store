/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { storeAddProductToBucketPost } from '../fn/application-api/store-add-product-to-bucket-post';
import { StoreAddProductToBucketPost$Params } from '../fn/application-api/store-add-product-to-bucket-post';
import { storeCreateOrderPost } from '../fn/application-api/store-create-order-post';
import { StoreCreateOrderPost$Params } from '../fn/application-api/store-create-order-post';
import { storeCreatePersonPost } from '../fn/application-api/store-create-person-post';
import { StoreCreatePersonPost$Params } from '../fn/application-api/store-create-person-post';
import { storeRemoveProductFromBucketPost } from '../fn/application-api/store-remove-product-from-bucket-post';
import { StoreRemoveProductFromBucketPost$Params } from '../fn/application-api/store-remove-product-from-bucket-post';
import { storeUpdatePersonAddressIdIdPatch } from '../fn/application-api/store-update-person-address-id-id-patch';
import { StoreUpdatePersonAddressIdIdPatch$Params } from '../fn/application-api/store-update-person-address-id-id-patch';

@Injectable({ providedIn: 'root' })
export class ApplicationApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `storeAddProductToBucketPost()` */
  static readonly StoreAddProductToBucketPostPath = '/store/addProductToBucket';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `storeAddProductToBucketPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  storeAddProductToBucketPost$Response(params?: StoreAddProductToBucketPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return storeAddProductToBucketPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `storeAddProductToBucketPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  storeAddProductToBucketPost(params?: StoreAddProductToBucketPost$Params, context?: HttpContext): Observable<void> {
    return this.storeAddProductToBucketPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `storeCreateOrderPost()` */
  static readonly StoreCreateOrderPostPath = '/store/create/order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `storeCreateOrderPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeCreateOrderPost$Response(params?: StoreCreateOrderPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return storeCreateOrderPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `storeCreateOrderPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeCreateOrderPost(params?: StoreCreateOrderPost$Params, context?: HttpContext): Observable<void> {
    return this.storeCreateOrderPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `storeCreatePersonPost()` */
  static readonly StoreCreatePersonPostPath = '/store/create/person';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `storeCreatePersonPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeCreatePersonPost$Response(params?: StoreCreatePersonPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return storeCreatePersonPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `storeCreatePersonPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeCreatePersonPost(params?: StoreCreatePersonPost$Params, context?: HttpContext): Observable<void> {
    return this.storeCreatePersonPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `storeRemoveProductFromBucketPost()` */
  static readonly StoreRemoveProductFromBucketPostPath = '/store/removeProductFromBucket';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `storeRemoveProductFromBucketPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  storeRemoveProductFromBucketPost$Response(params?: StoreRemoveProductFromBucketPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return storeRemoveProductFromBucketPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `storeRemoveProductFromBucketPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  storeRemoveProductFromBucketPost(params?: StoreRemoveProductFromBucketPost$Params, context?: HttpContext): Observable<void> {
    return this.storeRemoveProductFromBucketPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `storeUpdatePersonAddressIdIdPatch()` */
  static readonly StoreUpdatePersonAddressIdIdPatchPath = '/store/updatePersonAddress/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `storeUpdatePersonAddressIdIdPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeUpdatePersonAddressIdIdPatch$Response(params: StoreUpdatePersonAddressIdIdPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return storeUpdatePersonAddressIdIdPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `storeUpdatePersonAddressIdIdPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  storeUpdatePersonAddressIdIdPatch(params: StoreUpdatePersonAddressIdIdPatch$Params, context?: HttpContext): Observable<void> {
    return this.storeUpdatePersonAddressIdIdPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
