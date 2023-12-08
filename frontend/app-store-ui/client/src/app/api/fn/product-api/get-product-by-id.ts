/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Charger } from '../../models/charger';
import { Cooler } from '../../models/cooler';
import { DramMemory } from '../../models/dram-memory';
import { GraphicCard } from '../../models/graphic-card';
import { HardDrive } from '../../models/hard-drive';
import { Motherboard } from '../../models/motherboard';
import { PcCase } from '../../models/pc-case';
import { Processor } from '../../models/processor';
import { ProductCategory } from '../../models/product-category';
import { ProductOrder } from '../../models/product-order';

export interface GetProductById$Params {
  id: number;
}

export function getProductById(http: HttpClient, rootUrl: string, params: GetProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'bid'?: number;
'thumbnail'?: string;
'pictures'?: string;
'productCategory'?: ProductCategory;
'name'?: string;
'producer'?: string;
'guarantee'?: string;
'model'?: string;
'price'?: number;
'quantity'?: number;
'productOrders'?: Array<ProductOrder>;
'charger'?: Charger;
'cooler'?: Cooler;
'dramMemory'?: DramMemory;
'graphicCard'?: GraphicCard;
'hardDrive'?: HardDrive;
'motherboard'?: Motherboard;
'pcCase'?: PcCase;
'processor'?: Processor;
'rate'?: number;
'thumbnailAsByte'?: string;
'picturesAsBytes'?: string;
}>> {
  const rb = new RequestBuilder(rootUrl, getProductById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'bid'?: number;
      'thumbnail'?: string;
      'pictures'?: string;
      'productCategory'?: ProductCategory;
      'name'?: string;
      'producer'?: string;
      'guarantee'?: string;
      'model'?: string;
      'price'?: number;
      'quantity'?: number;
      'productOrders'?: Array<ProductOrder>;
      'charger'?: Charger;
      'cooler'?: Cooler;
      'dramMemory'?: DramMemory;
      'graphicCard'?: GraphicCard;
      'hardDrive'?: HardDrive;
      'motherboard'?: Motherboard;
      'pcCase'?: PcCase;
      'processor'?: Processor;
      'rate'?: number;
      'thumbnailAsByte'?: string;
      'picturesAsBytes'?: string;
      }>;
    })
  );
}

getProductById.PATH = '/product/getById/id/{id}';
