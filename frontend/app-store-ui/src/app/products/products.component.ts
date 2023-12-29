import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'client/src/app/api/models';
import { ApplicationApiService, ProductApiService } from 'client/src/app/api/services';
import { productCommonFieldsUtil } from '../utils/ProductLabels';
import { ObjectReceiverService } from '../s3/object-receiver.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  imagesUrlToBytes: any[] = [];
  productCommonFields = productCommonFieldsUtil;
  productOrderQuantity:number = 1;

  constructor(
    private productApiService: ProductApiService,
    private objectReceiverService: ObjectReceiverService,
    private applicationSerive: ApplicationApiService,
    private messageService:MessageService
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

  addProductToBucket(productId?:number) {
    this.applicationSerive
      .addProductToBucket({
        productId: productId,
        quantity: 1,
      })
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'dodano',
            detail:
              'produkt w ilosci: 1 został dodany do koszyka zakupowego',
          });
        },
        (error) => console.log(error.error)
      );
  }
}
