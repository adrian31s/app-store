/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AddressDto } from '../models/address-dto';
import { getAddressById } from '../fn/address-api/get-address-by-id';
import { GetAddressById$Params } from '../fn/address-api/get-address-by-id';
import { getAllAddresses } from '../fn/address-api/get-all-addresses';
import { GetAllAddresses$Params } from '../fn/address-api/get-all-addresses';
import { updateAddressById } from '../fn/address-api/update-address-by-id';
import { UpdateAddressById$Params } from '../fn/address-api/update-address-by-id';

@Injectable({ providedIn: 'root' })
export class AddressApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAddresses()` */
  static readonly GetAllAddressesPath = '/address/all';

  /**
   * get all addresses
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAddresses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAddresses$Response(params?: GetAllAddresses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AddressDto>>> {
    return getAllAddresses(this.http, this.rootUrl, params, context);
  }

  /**
   * get all addresses
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAddresses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAddresses(params?: GetAllAddresses$Params, context?: HttpContext): Observable<Array<AddressDto>> {
    return this.getAllAddresses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AddressDto>>): Array<AddressDto> => r.body)
    );
  }

  /** Path part for operation `getAddressById()` */
  static readonly GetAddressByIdPath = '/address/getAddressById/id/{id}';

  /**
   * get address by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAddressById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddressById$Response(params: GetAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'province'?: string;
'zipCode'?: string;
'streetName'?: string;
'buildingNumber'?: string;
'apartmentNumber'?: number;
}>> {
    return getAddressById(this.http, this.rootUrl, params, context);
  }

  /**
   * get address by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAddressById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAddressById(params: GetAddressById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'province'?: string;
'zipCode'?: string;
'streetName'?: string;
'buildingNumber'?: string;
'apartmentNumber'?: number;
}> {
    return this.getAddressById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'province'?: string;
'zipCode'?: string;
'streetName'?: string;
'buildingNumber'?: string;
'apartmentNumber'?: number;
}>): {
'bid'?: number;
'province'?: string;
'zipCode'?: string;
'streetName'?: string;
'buildingNumber'?: string;
'apartmentNumber'?: number;
} => r.body)
    );
  }

  /** Path part for operation `updateAddressById()` */
  static readonly UpdateAddressByIdPath = '/address/updateAddressById/id/{id}';

  /**
   * update address by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddressById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddressById$Response(params: UpdateAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateAddressById(this.http, this.rootUrl, params, context);
  }

  /**
   * update address by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAddressById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddressById(params: UpdateAddressById$Params, context?: HttpContext): Observable<void> {
    return this.updateAddressById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
