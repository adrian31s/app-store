/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Date } from '../../models/date';
import { Person } from '../../models/person';
import { Status } from '../../models/status';

export interface CreateOrder$Params {
      body?: Person
}

export function createOrder(http: HttpClient, rootUrl: string, params?: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'ordered'?: Date;
'delivered'?: Date;
'status'?: Status;
'totalPrice'?: number;
'bucketId'?: number;
}>> {
  const rb = new RequestBuilder(rootUrl, createOrder.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'bid'?: number;
      'ordered'?: Date;
      'delivered'?: Date;
      'status'?: Status;
      'totalPrice'?: number;
      'bucketId'?: number;
      }>;
    })
  );
}

createOrder.PATH = '/store/create/order';
