/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addressAllGet } from '../fn/address-api/address-all-get';
import { AddressAllGet$Params } from '../fn/address-api/address-all-get';
import { addressIdIdGet } from '../fn/address-api/address-id-id-get';
import { AddressIdIdGet$Params } from '../fn/address-api/address-id-id-get';
import { addressUpdateIdIdPatch } from '../fn/address-api/address-update-id-id-patch';
import { AddressUpdateIdIdPatch$Params } from '../fn/address-api/address-update-id-id-patch';

@Injectable({ providedIn: 'root' })
export class AddressApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addressAllGet()` */
  static readonly AddressAllGetPath = '/address/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addressAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  addressAllGet$Response(params?: AddressAllGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addressAllGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addressAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addressAllGet(params?: AddressAllGet$Params, context?: HttpContext): Observable<void> {
    return this.addressAllGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addressIdIdGet()` */
  static readonly AddressIdIdGetPath = '/address/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addressIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  addressIdIdGet$Response(params: AddressIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addressIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addressIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addressIdIdGet(params: AddressIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.addressIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addressUpdateIdIdPatch()` */
  static readonly AddressUpdateIdIdPatchPath = '/address/update/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addressUpdateIdIdPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addressUpdateIdIdPatch$Response(params: AddressUpdateIdIdPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addressUpdateIdIdPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addressUpdateIdIdPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addressUpdateIdIdPatch(params: AddressUpdateIdIdPatch$Params, context?: HttpContext): Observable<void> {
    return this.addressUpdateIdIdPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
