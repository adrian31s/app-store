/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChargerDto } from '../../models/charger-dto';
import { CoolerDto } from '../../models/cooler-dto';
import { DramMemoryDto } from '../../models/dram-memory-dto';
import { GraphicCardDto } from '../../models/graphic-card-dto';
import { HardDriveDto } from '../../models/hard-drive-dto';
import { MotherboardDto } from '../../models/motherboard-dto';
import { OpinionDto } from '../../models/opinion-dto';
import { PcCaseDto } from '../../models/pc-case-dto';
import { ProcessorDto } from '../../models/processor-dto';
import { Product } from '../../models/product';
import { ProductCategory } from '../../models/product-category';

export interface UpdateProductWithDetailsById$Params {
      body?: Product
}

export function updateProductWithDetailsById(http: HttpClient, rootUrl: string, params?: UpdateProductWithDetailsById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
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
'rate'?: number;
'charger'?: ChargerDto;
'cooler'?: CoolerDto;
'dramMemory'?: DramMemoryDto;
'graphicCard'?: GraphicCardDto;
'hardDrive'?: HardDriveDto;
'motherboard'?: MotherboardDto;
'pcCase'?: PcCaseDto;
'processor'?: ProcessorDto;
'opinions'?: Array<OpinionDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, updateProductWithDetailsById.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
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
      'rate'?: number;
      'charger'?: ChargerDto;
      'cooler'?: CoolerDto;
      'dramMemory'?: DramMemoryDto;
      'graphicCard'?: GraphicCardDto;
      'hardDrive'?: HardDriveDto;
      'motherboard'?: MotherboardDto;
      'pcCase'?: PcCaseDto;
      'processor'?: ProcessorDto;
      'opinions'?: Array<OpinionDto>;
      }>;
    })
  );
}

updateProductWithDetailsById.PATH = '/product/updateProductWithDetails';
