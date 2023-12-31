/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AddOpinion$Params {
  opinion?: string;
  productId?: number;
  rate?: number;
}

export function addOpinion(http: HttpClient, rootUrl: string, params?: AddOpinion$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, addOpinion.PATH, 'post');
  if (params) {
    rb.query('opinion', params.opinion, {});
    rb.query('productId', params.productId, {});
    rb.query('rate', params.rate, {});
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

addOpinion.PATH = '/store/addOpinion';
