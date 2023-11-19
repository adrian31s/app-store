import { Component } from '@angular/core';
import { ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  //should be injected
  // @Inject()
  products: ProductDto[] = [];

  constructor(productApiService: ProductApiService) {
     productApiService.productGetAllGet().subscribe({
      next: (val) => {
        this.products = val;
      },
    });
  }

  getProductAttribute(product:ProductDto, label:string){
    return this.getObjectValue(product,label)
  }

  getObjectValue(obj: any, key: any): string {
   return obj[key];
  }

  getImageSrc(imageId?:string){
    
  }


 productCommonFields: any[] = [
    {
      type: 'alpha',
      label: 'name',
    },
    {
      type: 'alpha',
      label: 'producer',
    },
    {
      type: 'alpha',
      label: 'guarantee',
    },
    {
      type: 'alpha',
      label: 'model',
    },
    {
      type: 'num',
      label: 'price',
    },
    {
      type: 'int',
      label: 'quantity',
    },
  ];

}
