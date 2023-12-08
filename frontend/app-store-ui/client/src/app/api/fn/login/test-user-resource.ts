/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface TestUserResource$Params {
}

export function testUserResource(http: HttpClient, rootUrl: string, params?: TestUserResource$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'token'?: string;
}>> {
  const rb = new RequestBuilder(rootUrl, testUserResource.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'token'?: string;
      }>;
    })
  );
}

testUserResource.PATH = '/auth/testUserResource';
