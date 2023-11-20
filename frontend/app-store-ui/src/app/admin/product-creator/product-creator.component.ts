import { Component, Input, OnInit } from '@angular/core';
import {
  Charger,
  Cooler,
  DramMemory,
  GraphicCard,
  HardDrive,
  Motherboard,
  PcCase,
  Processor,
  Product,
  ProductCategory,
  ProductDto,
} from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from 'src/app/utils/ProductLabels';
import PhotoUtil from 'src/app/utils/PhotoUtil';
import { MessageService } from 'primeng/api';
import { Console } from 'console';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent implements OnInit {
  @Input()
  productToUpdate?: ProductDto;
  @Input()
  productDetailsToUpdate?: any;
  disableSelectProductType: boolean = false;

  selectedProductType?: any;
  uploadedPictures: Set<any> = new Set();
  uploadedThumbnail: Set<any> = new Set();
  uploadedPicturesAsString?: string;
  uploadedThumbnailAsString?: string;

  productCommonFields: any[];
  productTypes: any[];

  constructor(
    private productApiService: ProductApiService,
    private messageService: MessageService
  ) {
    this.productCommonFields = productCommonFieldsUtil;
    this.productTypes = productTypesFieldsUtil;
  }

  ngOnInit(): void {
    if (this.productToUpdate !== undefined) {
      this.selectedProductType = this.productTypes.find(
        (productType) =>
          productType.category === this.productToUpdate!.productCategory
      );
      this.disableSelectProductType = true;
      this.delayFillInputs();
    }
  }

  //fillInputsToUpdateByIdBasedOnKey
  fillInputsToUpdate(obj: any, keys: any[]) {
    for (let key of keys) {
      (<HTMLInputElement>document.getElementById(key['label'])).value =
        obj[key['label']];
    }
  }

  private async delayFillInputs() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.fillInputsToUpdate(this.productToUpdate, this.productCommonFields);
    this.fillInputsToUpdate(
      this.productDetailsToUpdate,
      this.getSelectedProductLabels()
    );
  }

  private async convertFilesToStringBytes(files: Set<any>): Promise<string> {
    let uploadedPicturesAsStringByte = [];
    for (let file of files) {
      const fileAsString = await PhotoUtil.handleUploadImageToByteArray(file);
      uploadedPicturesAsStringByte.push(fileAsString);
    }
    return uploadedPicturesAsStringByte.join(',');
  }

  getSelectedProductLabels(): any[] {
    if (this.selectedProductType === undefined) return [];
    const selectedProductCategory = this.productTypes.find(
      (productType) =>
        productType.category === this.selectedProductType.category
    );

    let labels = selectedProductCategory.labels;
    if (labels === undefined || labels.length === 0) return [];
    return labels;
  }

  //image handler
  async onPicturesSelect(event: any) {
    for (let picture of event.currentFiles) {
      if (this.uploadedPictures.size < 4) {
        this.uploadedPictures.add(picture);
      } else return;
    }

    this.uploadedPicturesAsString = await this.convertFilesToStringBytes(
      this.uploadedPictures
    );
  }

  onPictureCancel() {
    this.uploadedPictures.clear();
  }

  async onThumbnailSelect(event: any) {
    if (this.uploadedThumbnail.size == 0) {
      this.uploadedThumbnail.add(event.files[0]);
      this.uploadedThumbnailAsString = await this.convertFilesToStringBytes(
        this.uploadedThumbnail
      );
    }
  }

  onThumbnailCancel() {
    this.uploadedThumbnail.clear();
  }

  //fillObjectsWithHTMLDocumnetInputsByIdBasedOnKey
  fillObjects(obj: any, keys: any[]) {
    for (let key of keys) {
      if (key['type'] === 'text') {
        obj[key['label']] = (<HTMLInputElement>(
          document.getElementById(key['label'])
        )).value;
      } else
        obj[key['label']] = Number(
          (<HTMLInputElement>document.getElementById(key['label'])).value
        );
    }
  }

  createProduct() {
    let product: Product = {};
    product.productCategory = this.selectedProductType.category;
    product.thumbnailAsByte = this.uploadedThumbnailAsString;
    product.picturesAsBytes = this.uploadedPicturesAsString;
    this.fillObjects(product, this.productCommonFields);

    switch (this.selectedProductType.category) {
      case ProductCategory.Charger: {
        let charger: Charger = {};
        this.fillObjects(charger, this.getSelectedProductLabels());
        product.charger = charger;
        break;
      }
      case ProductCategory.Cooler: {
        let cooler: Cooler = {};
        this.fillObjects(cooler, this.getSelectedProductLabels());
        product.cooler = cooler;
        break;
      }
      case ProductCategory.DramMemory: {
        let dramMemory: DramMemory = {};
        this.fillObjects(dramMemory, this.getSelectedProductLabels());
        product.dramMemory = dramMemory;
        break;
      }
      case ProductCategory.GraphicCard: {
        let graphicCart: GraphicCard = {};
        this.fillObjects(graphicCart, this.getSelectedProductLabels());
        product.graphicCard = graphicCart;
        break;
      }
      case ProductCategory.HardDrive: {
        let hardDrive: HardDrive = {};
        this.fillObjects(hardDrive, this.getSelectedProductLabels());
        product.hardDrive = hardDrive;
        break;
      }
      case ProductCategory.Motherboard: {
        let motherboard: Motherboard = {};
        this.fillObjects(motherboard, this.getSelectedProductLabels());
        product.motherboard = motherboard;
        break;
      }
      case ProductCategory.PcCase: {
        let pcCase: PcCase = {};
        this.fillObjects(pcCase, this.getSelectedProductLabels());
        product.pcCase = pcCase;
        break;
      }
      case ProductCategory.Processor: {
        let processor: Processor = {};
        this.fillObjects(processor, this.getSelectedProductLabels());
        product.processor = processor;
        break;
      }
    }

    if (this.productToUpdate) {
      product.bid = this.productToUpdate.bid;
      this.productApiService
        .productUpdateProductWithDetailsPut({ body: product })
        .subscribe(
          (value) => {
            if (typeof value === 'string') {
              this.displayToastMessage('success', 'Zaaktualizowano', value);
            }
          },
          (error) => {
            this.displayToastMessage('error', 'Blad', error.message);
          }
        );
    } else {
      this.productApiService.productCreatePost({ body: product }).subscribe(
        (value) => {
          if (typeof value === 'string') {
            this.displayToastMessage('success', 'Dodano', value);
          }
        },
        (error) => {
          console.log(error);
          this.displayToastMessage('error', 'Blad', error.message);
        }
      );
    }
  }

  private displayToastMessage(
    severity: string,
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
    console.log('[psz;p');
  }
}
