/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { login } from '../fn/login/login';
import { Login$Params } from '../fn/login/login';
import { testUserResource } from '../fn/login/test-user-resource';
import { TestUserResource$Params } from '../fn/login/test-user-resource';

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/auth/login';

  /**
   * login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params?: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'token'?: string;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * login
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params?: Login$Params, context?: HttpContext): Observable<{
'token'?: string;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>): {
'token'?: string;
} => r.body)
    );
  }

  /** Path part for operation `testUserResource()` */
  static readonly TestUserResourcePath = '/auth/testUserResource';

  /**
   * return sample text if authorized
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `testUserResource()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  testUserResource$Response(params?: TestUserResource$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'token'?: string;
}>> {
    return testUserResource(this.http, this.rootUrl, params, context);
  }

  /**
   * return sample text if authorized
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `testUserResource$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  testUserResource(params?: TestUserResource$Params, context?: HttpContext): Observable<{
'token'?: string;
}> {
    return this.testUserResource$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'token'?: string;
}>): {
'token'?: string;
} => r.body)
    );
  }

}
