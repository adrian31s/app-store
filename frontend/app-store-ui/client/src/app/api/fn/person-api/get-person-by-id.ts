/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddressDto } from '../../models/address-dto';

export interface GetPersonById$Params {
  id: number;
}

export function getPersonById(http: HttpClient, rootUrl: string, params: GetPersonById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, getPersonById.PATH, 'get');
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
      'username'?: string;
      'name'?: string;
      'lastName'?: string;
      'addresses'?: Array<AddressDto>;
      }>;
    })
  );
}

getPersonById.PATH = '/person/getById/id/{id}';
