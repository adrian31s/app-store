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
import { getPerson } from '../fn/person-api/get-person';
import { GetPerson$Params } from '../fn/person-api/get-person';
import { PersonDto } from '../models/person-dto';
import { updatePerson } from '../fn/person-api/update-person';
import { UpdatePerson$Params } from '../fn/person-api/update-person';

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

  /** Path part for operation `getPerson()` */
  static readonly GetPersonPath = '/person/getById';

  /**
   * get person
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPerson()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPerson$Response(params?: GetPerson$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return getPerson(this.http, this.rootUrl, params, context);
  }

  /**
   * get person
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPerson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPerson(params?: GetPerson$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.getPerson$Response(params, context).pipe(
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

  /** Path part for operation `updatePerson()` */
  static readonly UpdatePersonPath = '/person/update';

  /**
   * update person
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePerson()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePerson$Response(params?: UpdatePerson$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return updatePerson(this.http, this.rootUrl, params, context);
  }

  /**
   * update person
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePerson$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePerson(params?: UpdatePerson$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.updatePerson$Response(params, context).pipe(
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
