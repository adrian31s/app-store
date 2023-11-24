/* tslint:disable */
/* eslint-disable */
import { AddressDto } from '../models/address-dto';
export interface PersonDto {
  addresses?: Array<AddressDto>;
  bid?: number;
  lastName?: string;
  name?: string;
  username?: string;
}
