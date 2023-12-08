/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PersonDto } from '../../models/person-dto';

export interface GetAllPeople$Params {
}

export function getAllPeople(http: HttpClient, rootUrl: string, params?: GetAllPeople$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PersonDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllPeople.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PersonDto>>;
    })
  );
}

getAllPeople.PATH = '/person/getAll';
