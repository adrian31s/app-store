import { Component, OnInit } from '@angular/core';
import { AddressDto } from 'client/src/app/api/models';
import { AddressApiService, ApplicationApiService } from 'client/src/app/api/services';

@Component({
  selector: 'app-home-delivery-address',
  templateUrl: './home-delivery-address.component.html',
  styleUrls: ['./home-delivery-address.component.css']
})
export class HomeDeliveryAddressComponent implements OnInit{
  addresses:AddressDto[]=[];

  ngOnInit(): void {
    this.applicationApiService.getPersonAddresses().subscribe(
      (value)=>this.addresses=value,
      (error)=> console.error(error.error)
    )
  }

  constructor(
    private applicationApiService:ApplicationApiService
  ){
  }



}
