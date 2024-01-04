import { Component, OnInit } from '@angular/core';
import { ProductOrderDto } from 'client/src/app/api/models';
import { ApplicationApiService } from 'client/src/app/api/services';
import { ObjectReceiverService } from 'src/app/s3/object-receiver.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {
  bucketItems: ProductOrderDto[] = [];
  imagesUrlToBytes: any[] = [];

  constructor(
    private applicationApiService: ApplicationApiService,
    private objectReceiver: ObjectReceiverService
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

  deleteProductFromBucket(productId?:number){
    this.applicationApiService.removeProductFromBucket({productId:productId}).subscribe(
      (value) =>this.bucketItems=this.bucketItems.filter(b=>b.productDTO?.bid!==productId),
      (error)=> console.log(error.error)
    )
  }

  calculateWholePrice(){
    let sum = 0;
    this.bucketItems.forEach(b=> sum+=b.quantityProductOrder!*b.productDTO?.price!)
    return sum;
  }
}
