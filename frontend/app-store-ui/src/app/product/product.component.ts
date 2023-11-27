import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory, ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from '../utils/ProductLabels';
import { ObjectReceiverService } from '../s3/object-receiver.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  images = ['../assets/images/arrow-left-circle.svg'];
  desc = 'description';

  productCommonFields = productCommonFieldsUtil;
  productTypes = productTypesFieldsUtil;

  product!: ProductDto;
  productDetails!: any;
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductApiService,
    private objectReceiverService: ObjectReceiverService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
  }

  ngOnInit(): void {
    this.productService.getProductById({ id: this.productId }).subscribe(
      (value) => {
        this.product = value;
        this.productDetails = this.getProductDetailModel(this.product)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductAttribute(product: any, label: string) {
    return this.getObjectValue(product, label);
  }

  getObjectValue(obj: any, key: any): string {
    return obj[key];
  }

  getImageSrc(imageId?: string) {
    return this.objectReceiverService.getS3ImageSrcByImageName(imageId);
  }

  getSelectedProductLabels(): any[] {
    if (this.product === undefined) return [];
    const selectedProductCategory = this.productTypes.find(
      (productType) =>
        productType.category === this.product.productCategory
    );

    let labels = selectedProductCategory.labels;
    if (labels === undefined || labels.length === 0) return [];
    return labels;
  }

  getProductDetailModel(productDTO: ProductDto): any {
    switch (this.product.productCategory) {
      case ProductCategory.Charger: {
        return productDTO.charger;
      }
      case ProductCategory.Cooler: {
        return productDTO.cooler;
      }
      case ProductCategory.DramMemory: {
        return productDTO.dramMemory;
      }
      case ProductCategory.GraphicCard: {
        return productDTO.graphicCard;
      }
      case ProductCategory.HardDrive: {
        return productDTO.hardDrive;
      }
      case ProductCategory.Motherboard: {
        return productDTO.motherboard;
      }
      case ProductCategory.PcCase: {
        return productDTO.pcCase;
      }
      case ProductCategory.Processor: {
        return productDTO.processor;
      }
    }
  }
}
