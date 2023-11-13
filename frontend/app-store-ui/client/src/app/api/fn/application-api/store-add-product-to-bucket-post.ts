/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface StoreAddProductToBucketPost$Params {
  personId?: number;
  productId?: number;
  quantity?: number;
}

export function storeAddProductToBucketPost(http: HttpClient, rootUrl: string, params?: StoreAddProductToBucketPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, storeAddProductToBucketPost.PATH, 'post');
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

storeAddProductToBucketPost.PATH = '/store/addProductToBucket';
