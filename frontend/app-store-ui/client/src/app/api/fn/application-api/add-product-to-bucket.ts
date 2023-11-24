/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddProductToBucket$Params {
  personId?: number;
  productId?: number;
  quantity?: number;
}

export function addProductToBucket(http: HttpClient, rootUrl: string, params?: AddProductToBucket$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, addProductToBucket.PATH, 'post');
  if (params) {
    rb.query('personId', params.personId, {});
    rb.query('productId', params.productId, {});
    rb.query('quantity', params.quantity, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

addProductToBucket.PATH = '/store/addProductToBucket';
