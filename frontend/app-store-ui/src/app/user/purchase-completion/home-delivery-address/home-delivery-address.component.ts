import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address, AddressDto } from 'client/src/app/api/models';
import {
  AddressApiService,
  ApplicationApiService,
} from 'client/src/app/api/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-delivery-address',
  templateUrl: './home-delivery-address.component.html',
  styleUrls: ['./home-delivery-address.component.css'],
})
export class HomeDeliveryAddressComponent implements OnInit {
  @Output()
  selectedAddressEmitter = new EventEmitter<AddressDto>();
  
  @Input()
  shouldReturDeliveryAddress:boolean=false;

  addresses: AddressDto[] = [];
  selectedAddress: AddressDto = {};

  addressCreatorVisible: boolean = false;
  newAddress: Address = {};

  ngOnInit(): void {
    this.getPersonAddresses();
  }

  private getPersonAddresses() {
    this.applicationApiService.getPersonAddresses().subscribe(
      (value) => (this.addresses = value),
      (error) => console.error(error.error)
    );
  }

  constructor(
    private applicationApiService: ApplicationApiService,
    private messageService: MessageService
  ) {}

  setDeliveryAddress() {
    this.selectedAddressEmitter.emit(this.selectedAddress);
  }

  createNewAddress() {
    this.applicationApiService
      .updatePersonAddressById({ body: this.newAddress })
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'dodano nowy adres',
          });
          this.addressCreatorVisible = false;
          this.getPersonAddresses();
          this.newAddress={};
        },
        (error) => console.error(error.error)
      );
  }
}
