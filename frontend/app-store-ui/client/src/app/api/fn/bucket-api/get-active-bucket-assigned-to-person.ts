/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductOrderDto } from '../../models/product-order-dto';

export interface GetActiveBucketAssignedToPerson$Params {
}

export function getActiveBucketAssignedToPerson(http: HttpClient, rootUrl: string, params?: GetActiveBucketAssignedToPerson$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>> {
  const rb = new RequestBuilder(rootUrl, getActiveBucketAssignedToPerson.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'bid'?: number;
      'archived'?: boolean;
      'productOrders'?: Array<ProductOrderDto>;
      'personId'?: number;
      'orderId'?: number;
      }>;
    })
  );
}

getActiveBucketAssignedToPerson.PATH = '/bucket/getActiveBucketAssignedToPerson';
