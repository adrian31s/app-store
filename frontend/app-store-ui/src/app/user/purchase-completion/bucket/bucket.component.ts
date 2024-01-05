import { Component, OnInit } from '@angular/core';
import { AddressDto, ProductOrderDto } from 'client/src/app/api/models';
import { ApplicationApiService } from 'client/src/app/api/services';
import { MessageService } from 'primeng/api';
import { ObjectReceiverService } from 'src/app/s3/object-receiver.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {
  bucketItems: ProductOrderDto[] = [];
  imagesUrlToBytes: any[] = [];
  productOrdersToUpdateQuantity:Map<number,number> = new Map<number, number>();

  addressCreatorVisible: boolean = false;
  deliveryAddress?: AddressDto;

  constructor(
    private applicationApiService: ApplicationApiService,
    private objectReceiver: ObjectReceiverService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initBucket();
  }

  initBucket() {
    this.applicationApiService.getActiveBucket().subscribe(
      (value) => {
        this.bucketItems = value.productOrders!;
        this.imagesUrlToBytes = new Array(value.productOrders?.length).fill('');
        this.getImagesSrc();
      },
      (error) => console.log(error.error)
    );
  }

  async getImagesSrc() {
    if (this.bucketItems !== undefined)
      for (let i = 0; i < this.bucketItems.length; i++) {
        this.imagesUrlToBytes[i] = await this.getImageSrc(
          this.bucketItems[i].productDTO?.thumbnail
        );
      }
  }

  getImageSrc(imageId?: string) {
    return this.objectReceiver.getS3ImageSrcByImageName(imageId);
  }

  calculatePrice(quantity?: number, price?: number) {
    return quantity !== undefined && price !== undefined ? quantity * price : 0;
  }

  checkIfQuantityCorrect(bucketItemId: number): boolean {
    if (
      this.bucketItems[bucketItemId].productDTO?.quantity! <
      this.bucketItems[bucketItemId].quantityProductOrder!
    ) {
      return false;
    }
    return true;
  }

  deleteProductFromBucket(productId?: number) {
    this.applicationApiService
      .removeProductFromBucket({ productId: productId })
      .subscribe(
        (value) =>
          (this.bucketItems = this.bucketItems.filter(
            (b) => b.productDTO?.bid !== productId
          )),
        (error) => console.log(error.error)
      );
  }

  calculateWholePrice() {
    let sum = 0;
    this.bucketItems.forEach(
      (b) => (sum += b.quantityProductOrder! * b.productDTO?.price!)
    );
    return sum;
  }

  setDeliveryAddress(selectedAddress: AddressDto) {
    this.deliveryAddress = selectedAddress;
    this.addressCreatorVisible = false;
  }

  updateQuantityOfProduct(productId:number,quantity:number){
    this.productOrdersToUpdateQuantity.set(productId,quantity);
  }

  createOrder() {
    if (this.deliveryAddress === undefined) {
      this.messageService.add({
        severity: 'error',
        summary: 'nie podano adresu',
        detail: 'wybierz adres dostawy',
      });
      return;
    }

    for(let map of this.productOrdersToUpdateQuantity){
      this.applicationApiService.addProductToBucket({productId:map[0],quantity:map[1]}).subscribe((complete)=>this.finalizePurchase());
    }


  }

  private finalizePurchase(){

    this.applicationApiService
      .finalizeBuying({ deliveryAddressId: this.deliveryAddress!.bid })
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'stworzono zamowienie',
            detail: 'po wiecej informacji zajrzyj na email',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 3000);
        },
        (error) => console.error(error.error)
      );
  }
}

