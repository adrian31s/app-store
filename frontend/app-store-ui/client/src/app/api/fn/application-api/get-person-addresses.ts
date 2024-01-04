/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetPersonAddresses$Params {
}

export function getPersonAddresses(http: HttpClient, rootUrl: string, params?: GetPersonAddresses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'bid'?: number;
'province'?: string;
'zipCode'?: string;
'streetName'?: string;
'buildingNumber'?: string;
'apartmentNumber'?: number;
}>>> {
  const rb = new RequestBuilder(rootUrl, getPersonAddresses.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      'bid'?: number;
      'province'?: string;
      'zipCode'?: string;
      'streetName'?: string;
      'buildingNumber'?: string;
      'apartmentNumber'?: number;
      }>>;
    })
  );
}

getPersonAddresses.PATH = '/store/getPersonAddresses';
