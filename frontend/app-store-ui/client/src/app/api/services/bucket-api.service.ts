/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getActiveBucketAssignedToPerson } from '../fn/bucket-api/get-active-bucket-assigned-to-person';
import { GetActiveBucketAssignedToPerson$Params } from '../fn/bucket-api/get-active-bucket-assigned-to-person';
import { ProductOrderDto } from '../models/product-order-dto';

@Injectable({ providedIn: 'root' })
export class BucketApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getActiveBucketAssignedToPerson()` */
  static readonly GetActiveBucketAssignedToPersonPath = '/bucket/getActiveBucketAssignedToPerson';

  /**
   * get active bucket which can be modified assigned to person
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveBucketAssignedToPerson()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucketAssignedToPerson$Response(params?: GetActiveBucketAssignedToPerson$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>> {
    return getActiveBucketAssignedToPerson(this.http, this.rootUrl, params, context);
  }

  /**
   * get active bucket which can be modified assigned to person
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActiveBucketAssignedToPerson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucketAssignedToPerson(params?: GetActiveBucketAssignedToPerson$Params, context?: HttpContext): Observable<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}> {
    return this.getActiveBucketAssignedToPerson$Response(params, context).pipe(
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
