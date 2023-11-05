/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { bucketGetActiveBucketByIdIdIdGet } from '../fn/bucket-api/bucket-get-active-bucket-by-id-id-id-get';
import { BucketGetActiveBucketByIdIdIdGet$Params } from '../fn/bucket-api/bucket-get-active-bucket-by-id-id-id-get';

@Injectable({ providedIn: 'root' })
export class BucketApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `bucketGetActiveBucketByIdIdIdGet()` */
  static readonly BucketGetActiveBucketByIdIdIdGetPath = '/bucket/getActiveBucketById/id/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bucketGetActiveBucketByIdIdIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  bucketGetActiveBucketByIdIdIdGet$Response(params: BucketGetActiveBucketByIdIdIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return bucketGetActiveBucketByIdIdIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bucketGetActiveBucketByIdIdIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  bucketGetActiveBucketByIdIdIdGet(params: BucketGetActiveBucketByIdIdIdGet$Params, context?: HttpContext): Observable<void> {
    return this.bucketGetActiveBucketByIdIdIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
