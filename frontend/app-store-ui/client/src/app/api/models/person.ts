/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { Role } from '../models/role';
export interface Person {
  addresses?: Array<Address>;
  bid?: number;
  email?: string;
  lastName?: string;
  name?: string;
  password?: string;
  role?: Role;
  username?: string;
}
