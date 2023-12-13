import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpinionDto, ProductDto } from 'client/src/app/api/models';
import { ApplicationApiService, ProductApiService } from 'client/src/app/api/services';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from '../utils/ProductLabels';
import { ObjectReceiverService } from '../s3/object-receiver.service';
import ProductUtil from '../utils/ProductUtil';
import { AuthService } from '../auth/service/auth.service';
import { MessageService } from 'primeng/api';

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
  opinions?:OpinionDto[]
  productId: number = 0;

  username!:string;
  customOpinionRate:number=0;
  customOpinionComment:string='';
  addOpinionActive:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductApiService,
    private objectReceiverService: ObjectReceiverService,
    private applicationSerive: ApplicationApiService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });

    this.username = authService.getUsername();
  }

  ngOnInit(): void {
    this.productService.getProductById({ id: this.productId }).subscribe(
      (value) => {
        this.product = value;
        this.productDetails = ProductUtil.getProductDetailModel(this.product);
        this.opinions = this.product.opinions;
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
      (productType) => productType.category === this.product.productCategory
    );

    let labels = selectedProductCategory.labels;
    if (labels === undefined || labels.length === 0) return [];
    return labels;
  }

  addOpinion(){
    if(this.customOpinionComment.length< 3|| this.customOpinionRate===0){
      this.messageService.add({
        severity: "error",
        summary: "nie dodano",
        detail: "twoja opinia musi posiadac komentarz dluzszy niz 3 znaki jak i ranking w skali 1-5",
      });
      return;
    }
    this.applicationSerive.addOpinion({opinion:this.customOpinionComment, productId:this.productId, rate:this.customOpinionRate}).subscribe(
      (complete) => {
        this.messageService.add({
          severity: "success",
          summary: "dodano",
          detail: "twoja opinia zostala dodana pomyslnie",
        });
        this.customOpinionComment='';
        this.customOpinionRate=0;
        this.addOpinionActive=false;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  removeOpinion(opnionId:number | undefined){
    this.applicationSerive.removeOpinion({opinionId:opnionId}).subscribe(
      (complete) => {
        this.messageService.add({
          severity: "success",
          summary: "usunieto",
          detail: "twoja opinia zostala usunieta",
        });

        this.opinions = this.opinions?.filter(o=>o.bid!==opnionId);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
