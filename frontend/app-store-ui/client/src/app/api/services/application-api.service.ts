/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addOpinion } from '../fn/application-api/add-opinion';
import { AddOpinion$Params } from '../fn/application-api/add-opinion';
import { addProductToBucket } from '../fn/application-api/add-product-to-bucket';
import { AddProductToBucket$Params } from '../fn/application-api/add-product-to-bucket';
import { AddressDto } from '../models/address-dto';
import { createOrder } from '../fn/application-api/create-order';
import { CreateOrder$Params } from '../fn/application-api/create-order';
import { createPerson } from '../fn/application-api/create-person';
import { CreatePerson$Params } from '../fn/application-api/create-person';
import { Date } from '../models/date';
import { forgotPassword } from '../fn/application-api/forgot-password';
import { ForgotPassword$Params } from '../fn/application-api/forgot-password';
import { getActiveBucket } from '../fn/application-api/get-active-bucket';
import { GetActiveBucket$Params } from '../fn/application-api/get-active-bucket';
import { ProductOrderDto } from '../models/product-order-dto';
import { removeOpinion } from '../fn/application-api/remove-opinion';
import { RemoveOpinion$Params } from '../fn/application-api/remove-opinion';
import { removeProductFromBucket } from '../fn/application-api/remove-product-from-bucket';
import { RemoveProductFromBucket$Params } from '../fn/application-api/remove-product-from-bucket';
import { Status } from '../models/status';
import { updatePersonAddressById } from '../fn/application-api/update-person-address-by-id';
import { UpdatePersonAddressById$Params } from '../fn/application-api/update-person-address-by-id';

@Injectable({ providedIn: 'root' })
export class ApplicationApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addOpinion()` */
  static readonly AddOpinionPath = '/store/addOpinion';

  /**
   * add opinion to product
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOpinion()` instead.
   *
   * This method doesn't expect any request body.
   */
  addOpinion$Response(params?: AddOpinion$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addOpinion(this.http, this.rootUrl, params, context);
  }

  /**
   * add opinion to product
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addOpinion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addOpinion(params?: AddOpinion$Params, context?: HttpContext): Observable<void> {
    return this.addOpinion$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addProductToBucket()` */
  static readonly AddProductToBucketPath = '/store/addProductToBucket';

  /**
   * add product to active bucket
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProductToBucket()` instead.
   *
   * This method doesn't expect any request body.
   */
  addProductToBucket$Response(params?: AddProductToBucket$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addProductToBucket(this.http, this.rootUrl, params, context);
  }

  /**
   * add product to active bucket
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProductToBucket$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addProductToBucket(params?: AddProductToBucket$Params, context?: HttpContext): Observable<void> {
    return this.addProductToBucket$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/store/create/order';

  /**
   * create new order
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrder$Response(params?: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'ordered'?: Date;
'delivered'?: Date;
'status'?: Status;
'totalPrice'?: number;
'bucketId'?: number;
}>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * create new order
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrder(params?: CreateOrder$Params, context?: HttpContext): Observable<{
'bid'?: number;
'ordered'?: Date;
'delivered'?: Date;
'status'?: Status;
'totalPrice'?: number;
'bucketId'?: number;
}> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'ordered'?: Date;
'delivered'?: Date;
'status'?: Status;
'totalPrice'?: number;
'bucketId'?: number;
}>): {
'bid'?: number;
'ordered'?: Date;
'delivered'?: Date;
'status'?: Status;
'totalPrice'?: number;
'bucketId'?: number;
} => r.body)
    );
  }

  /** Path part for operation `createPerson()` */
  static readonly CreatePersonPath = '/store/create/person';

  /**
   * create new person
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPerson()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPerson$Response(params?: CreatePerson$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return createPerson(this.http, this.rootUrl, params, context);
  }

  /**
   * create new person
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPerson$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPerson(params?: CreatePerson$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.createPerson$Response(params, context).pipe(
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

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/store/forgotPassword';

  /**
   * send email to forgotten password account
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params?: ForgotPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * send email to forgotten password account
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params?: ForgotPassword$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.forgotPassword$Response(params, context).pipe(
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

  /** Path part for operation `getActiveBucket()` */
  static readonly GetActiveBucketPath = '/store/getActiveBucket';

  /**
   * get active bucket
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveBucket()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucket$Response(params?: GetActiveBucket$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>> {
    return getActiveBucket(this.http, this.rootUrl, params, context);
  }

  /**
   * get active bucket
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getActiveBucket$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveBucket(params?: GetActiveBucket$Params, context?: HttpContext): Observable<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}> {
    return this.getActiveBucket$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
}>): {
'bid'?: number;
'archived'?: boolean;
'productOrders'?: Array<ProductOrderDto>;
'personId'?: number;
'orderId'?: number;
} => r.body)
    );
  }

  /** Path part for operation `removeOpinion()` */
  static readonly RemoveOpinionPath = '/store/removeOpinion';

  /**
   * remove opinion from product
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeOpinion()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeOpinion$Response(params?: RemoveOpinion$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeOpinion(this.http, this.rootUrl, params, context);
  }

  /**
   * remove opinion from product
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeOpinion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeOpinion(params?: RemoveOpinion$Params, context?: HttpContext): Observable<void> {
    return this.removeOpinion$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `removeProductFromBucket()` */
  static readonly RemoveProductFromBucketPath = '/store/removeProductFromBucket';

  /**
   * remove product from bucket
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeProductFromBucket()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProductFromBucket$Response(params?: RemoveProductFromBucket$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return removeProductFromBucket(this.http, this.rootUrl, params, context);
  }

  /**
   * remove product from bucket
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeProductFromBucket$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeProductFromBucket(params?: RemoveProductFromBucket$Params, context?: HttpContext): Observable<void> {
    return this.removeProductFromBucket$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updatePersonAddressById()` */
  static readonly UpdatePersonAddressByIdPath = '/store/updatePersonAddress';

  /**
   * update person address by person id, if address not exists then create new one
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePersonAddressById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonAddressById$Response(params?: UpdatePersonAddressById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}>> {
    return updatePersonAddressById(this.http, this.rootUrl, params, context);
  }

  /**
   * update person address by person id, if address not exists then create new one
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePersonAddressById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePersonAddressById(params?: UpdatePersonAddressById$Params, context?: HttpContext): Observable<{
'bid'?: number;
'username'?: string;
'name'?: string;
'lastName'?: string;
'addresses'?: Array<AddressDto>;
}> {
    return this.updatePersonAddressById$Response(params, context).pipe(
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
