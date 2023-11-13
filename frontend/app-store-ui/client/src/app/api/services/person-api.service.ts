/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { personGetAllGet } from '../fn/person-api/person-get-all-get';
import { PersonGetAllGet$Params } from '../fn/person-api/person-get-all-get';
import { personGetByIdIdIdGet } from '../fn/person-api/person-get-by-id-id-id-get';
import { PersonGetByIdIdIdGet$Params } from '../fn/person-api/person-get-by-id-id-id-get';
import { personUpdatePatch } from '../fn/person-api/person-update-patch';
import { PersonUpdatePatch$Params } from '../fn/person-api/person-update-patch';

@Injectable({ providedIn: 'root' })
export class PersonApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `personGetAllGet()` */
  static readonly PersonGetAllGetPath = '/person/getAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `personGetAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  personGetAllGet$Response(params?: PersonGetAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return personGetAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `personGetAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  personGetAllGet(params?: PersonGetAllGet$Params, context?: HttpContext): Observable<void> {
    return this.personGetAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `personGetByIdIdIdGet()` */
  static readonly PersonGetByIdIdIdGetPath = '/person/getById/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `personGetByIdIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  personGetByIdIdIdGet$Response(params: PersonGetByIdIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return personGetByIdIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `personGetByIdIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  personGetByIdIdIdGet(params: PersonGetByIdIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.personGetByIdIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `personUpdatePatch()` */
  static readonly PersonUpdatePatchPath = '/person/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `personUpdatePatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  personUpdatePatch$Response(params?: PersonUpdatePatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return personUpdatePatch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `personUpdatePatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  personUpdatePatch(params?: PersonUpdatePatch$Params, context?: HttpContext): Observable<void> {
    return this.personUpdatePatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
