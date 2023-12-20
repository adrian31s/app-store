import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import { productCommonFieldsUtil } from '../utils/ProductLabels';
import { ObjectReceiverService } from '../s3/object-receiver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  imagesUrlToBytes: any[] = [];
  productCommonFields = productCommonFieldsUtil;

  constructor(
    private productApiService: ProductApiService,
    private objectReceiverService: ObjectReceiverService,
  ) {
    this.productApiService.getProducts().subscribe({
      next: (val) => {
        console.log(val)
        this.products = val;
        this.imagesUrlToBytes = new Array(this.products.length).fill('');
        this.getImagesSrc();
      },
    });
  }

  ngOnInit(): void {}

  async getImagesSrc() {
    for (let i = 0; i < this.products.length; i++) {
      console.log('key:' + this.products[i].thumbnail);
      this.imagesUrlToBytes[i] = await this.getImageSrc(
        this.products[i].thumbnail
      );
      console.log(this.imagesUrlToBytes[i]);
    }
  }

  getProductAttribute(product: ProductDto, label: string) {
    return this.getObjectValue(product, label);
  }

  getObjectValue(obj: any, key: any): string {
    return obj[key];
  }

  getImageSrc(imageId?: string) {
    return this.objectReceiverService.getS3ImageSrcByImageName(imageId);
  }

  setFilteredProducts(productDtos :ProductDto[]){
    this.products=productDtos;
  }
}
