/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';
import { AddressDto } from '../../models/address-dto';

export interface UpdatePersonAddressById$Params {
      body?: Address
}

export function updatePersonAddressById(http: HttpClient, rootUrl: string, params?: UpdatePersonAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, updatePersonAddressById.PATH, 'patch');
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
      'username'?: string;
      'name'?: string;
      'lastName'?: string;
      'addresses'?: Array<AddressDto>;
      }>;
    })
  );
}

updatePersonAddressById.PATH = '/store/updatePersonAddress';
