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
import { getAllPeople } from '../fn/person-api/get-all-people';
import { GetAllPeople$Params } from '../fn/person-api/get-all-people';
import { getPersonById } from '../fn/person-api/get-person-by-id';
import { GetPersonById$Params } from '../fn/person-api/get-person-by-id';
import { PersonDto } from '../models/person-dto';
import { updatePersonById } from '../fn/person-api/update-person-by-id';
import { UpdatePersonById$Params } from '../fn/person-api/update-person-by-id';

@Injectable({ providedIn: 'root' })
export class PersonApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllPeople()` */
  static readonly GetAllPeoplePath = '/person/getAll';

  /**
   * get all people
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPeople()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPeople$Response(params?: GetAllPeople$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PersonDto>>> {
    return getAllPeople(this.http, this.rootUrl, params, context);
  }

  /**
   * get all people
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPeople$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPeople(params?: GetAllPeople$Params, context?: HttpContext): Observable<Array<PersonDto>> {
    return this.getAllPeople$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PersonDto>>): Array<PersonDto> => r.body)
    );
  }

  /** Path part for operation `getPersonById()` */
  static readonly GetPersonByIdPath = '/person/getById/id/{id}';

  /**
   * get person by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPersonById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPersonById$Response(params: GetPersonById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return getPersonById(this.http, this.rootUrl, params, context);
  }

  /**
   * get person by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPersonById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPersonById(params: GetPersonById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.getPersonById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>): {
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
} => r.body)
    );
  }

  /** Path part for operation `updatePersonById()` */
  static readonly UpdatePersonByIdPath = '/person/update';

  /**
   * update person by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePersonById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonById$Response(params?: UpdatePersonById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return updatePersonById(this.http, this.rootUrl, params, context);
  }

  /**
   * update person by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePersonById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonById(params?: UpdatePersonById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.updatePersonById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>): {
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
} => r.body)
    );
  }

}
