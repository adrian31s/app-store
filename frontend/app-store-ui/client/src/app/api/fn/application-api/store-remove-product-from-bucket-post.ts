/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface StoreRemoveProductFromBucketPost$Params {
  personId?: number;
  productId?: number;
}

export function storeRemoveProductFromBucketPost(http: HttpClient, rootUrl: string, params?: StoreRemoveProductFromBucketPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, storeRemoveProductFromBucketPost.PATH, 'post');
  if (params) {
    rb.query('personId', params.personId, {});
    rb.query('productId', params.productId, {});
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

storeRemoveProductFromBucketPost.PATH = '/store/removeProductFromBucket';
