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
import { ProductCategory } from '../../models/product-category';
import { ProductSearchCriteria } from '../../models/product-search-criteria';

export interface UpdateProductBaseById$Params {
  id: number;
      body?: ProductSearchCriteria
}

export function updateProductBaseById(http: HttpClient, rootUrl: string, params: UpdateProductBaseById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
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
  const rb = new RequestBuilder(rootUrl, updateProductBaseById.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
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

updateProductBaseById.PATH = '/product/updateBaseById/id/{id}';
