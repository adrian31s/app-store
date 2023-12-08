/* tslint:disable */
/* eslint-disable */
import { ChargerDto } from '../models/charger-dto';
import { CoolerDto } from '../models/cooler-dto';
import { DramMemoryDto } from '../models/dram-memory-dto';
import { GraphicCardDto } from '../models/graphic-card-dto';
import { HardDriveDto } from '../models/hard-drive-dto';
import { MotherboardDto } from '../models/motherboard-dto';
import { OpinionDto } from '../models/opinion-dto';
import { PcCaseDto } from '../models/pc-case-dto';
import { ProcessorDto } from '../models/processor-dto';
import { ProductCategory } from '../models/product-category';
export interface ProductDto {
  bid?: number;
  charger?: ChargerDto;
  cooler?: CoolerDto;
  dramMemory?: DramMemoryDto;
  graphicCard?: GraphicCardDto;
  guarantee?: string;
  hardDrive?: HardDriveDto;
  model?: string;
  motherboard?: MotherboardDto;
  name?: string;
  opinions?: Array<OpinionDto>;
  pcCase?: PcCaseDto;
  pictures?: string;
  price?: number;
  processor?: ProcessorDto;
  producer?: string;
  productCategory?: ProductCategory;
  quantity?: number;
  rate?: number;
  thumbnail?: string;
}
