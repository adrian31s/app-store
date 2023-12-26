import { Component } from '@angular/core';
import { ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import { ObjectReceiverService } from 'src/app/s3/object-receiver.service';

@Component({
  selector: 'app-fast-filter',
  templateUrl: './fast-filter.component.html',
  styleUrls: ['./fast-filter.component.css'],
})
export class FastFilterComponent {
  images = ['../assets/images/svg/search.svg'];

  productName: string = ''
  productDtos: ProductDto[] = [];
  imagesUrlToBytes: any[] = [];

  constructor(
    private productApi: ProductApiService,
    private objectReceiver: ObjectReceiverService
  ) {}

  findByPeroductName() {
    if(this.productName.length===0 || this.productName==='') return;
    this.productApi
      .getProductsBySearchCriteria({ body: { name: "like;%" + this.productName+"%" } })
      .subscribe(
        (value) => {
            this.productDtos = value;
            this.imagesUrlToBytes = new Array(value.length).fill('');
            this.getImagesSrc();
        },
        (error) => console.log(error)
      );
  }

  async getImagesSrc() {
    for (let i = 0; i < this.productDtos.length; i++) {
      console.log('key:' + this.productDtos[i].thumbnail);
      this.imagesUrlToBytes[i] = await this.getImageSrc(
        this.productDtos[i].thumbnail
      );
    }
  }

  getImageSrc(imageId?: string) {
    return this.objectReceiver.getS3ImageSrcByImageName(imageId);
  }
}
