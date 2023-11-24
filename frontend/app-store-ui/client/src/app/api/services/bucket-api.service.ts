/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getActiveBucketAssignedToPersonById } from '../fn/bucket-api/get-active-bucket-assigned-to-person-by-id';
import { GetActiveBucketAssignedToPersonById$Params } from '../fn/bucket-api/get-active-bucket-assigned-to-person-by-id';
import { ProductOrderDto } from '../models/product-order-dto';

@Injectable({ providedIn: 'root' })
export class BucketApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getActiveBucketAssignedToPersonById()` */
  static readonly GetActiveBucketAssignedToPersonByIdPath = '/bucket/getActiveBucketAssignedToPersonById/id/{id}';

  /**
   * get active bucket which can be modified assigned to person
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveBucketAssignedToPersonById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucketAssignedToPersonById$Response(params: GetActiveBucketAssignedToPersonById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>> {
    return getActiveBucketAssignedToPersonById(this.http, this.rootUrl, params, context);
  }

  /**
   * get active bucket which can be modified assigned to person
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActiveBucketAssignedToPersonById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucketAssignedToPersonById(params: GetActiveBucketAssignedToPersonById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}> {
    return this.getActiveBucketAssignedToPersonById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>): {
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
} => r.body)
    );
  }

}
