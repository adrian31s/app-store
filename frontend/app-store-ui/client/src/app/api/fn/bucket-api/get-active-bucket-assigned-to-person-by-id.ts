/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductOrderDto } from '../../models/product-order-dto';

export interface GetActiveBucketAssignedToPersonById$Params {
  id: number;
}

export function getActiveBucketAssignedToPersonById(http: HttpClient, rootUrl: string, params: GetActiveBucketAssignedToPersonById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>> {
  const rb = new RequestBuilder(rootUrl, getActiveBucketAssignedToPersonById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getActiveBucketAssignedToPersonById.PATH = '/bucket/getActiveBucketAssignedToPersonById/id/{id}';
