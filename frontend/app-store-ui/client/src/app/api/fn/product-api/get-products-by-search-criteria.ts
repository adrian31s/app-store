/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductDto } from '../../models/product-dto';
import { ProductEnhancedSearchCriteria } from '../../models/product-enhanced-search-criteria';

export interface GetProductsBySearchCriteria$Params {
      body?: ProductEnhancedSearchCriteria
}

export function getProductsBySearchCriteria(http: HttpClient, rootUrl: string, params?: GetProductsBySearchCriteria$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Array<ProductDto>>>> {
  const rb = new RequestBuilder(rootUrl, getProductsBySearchCriteria.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Array<ProductDto>>>;
    })
  );
}

getProductsBySearchCriteria.PATH = '/product/getBySearchCriteria';
