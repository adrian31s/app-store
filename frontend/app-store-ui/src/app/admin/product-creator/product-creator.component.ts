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
import { Buffer } from 'buffer';
import { ProductApiService } from 'client/src/app/api/services';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.css'],
})
export class ProductCreatorComponent {
  selectedProductType?: any;
  uploadedPictures: Set<any> = new Set();
  uploadedThumbnail: Set<any> = new Set();
  uploadedPicturesAsString?: string;
  uploadedThumbnailAsString?: string;

  constructor(private productApiService: ProductApiService) {}

  private async convertFilesToStringBytes(files: Set<any>): Promise<string> {
    let uploadedPicturesAsStringByte = [];
    for (let file of files) {
      const fileAsString = await this.handleUploadImageToByteArray2(file);
      uploadedPicturesAsStringByte.push(fileAsString);
    }
    return uploadedPicturesAsStringByte.join(',');
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

  productTypes: any[] = [
    {
      category: ProductCategory.Charger,
      labels: [
        {
          type: 'alpha',
          label: 'power',
        },
        {
          type: 'alpha',
          label: 'standard',
        },
        {
          type: 'int',
          label: 'noise',
        },
        {
          type: 'alpha',
          label: 'coolingType',
        },
        {
          type: 'int',
          label: 'width',
        },
        {
          type: 'int',
          label: 'height',
        },
        {
          type: 'int',
          label: 'depth',
        },
      ],
    },
    {
      category: ProductCategory.Cooler,
      labels: [
        {
          type: 'alpha',
          label: 'type',
        },
        {
          type: 'int',
          label: 'maxRotationSpeed',
        },
        {
          type: 'int',
          label: 'maxVolume',
        },
        {
          type: 'int',
          label: 'supplyVoltage',
        },
        {
          type: 'alpha',
          label: 'coolerType',
        },
      ],
    },
    {
      category: ProductCategory.DramMemory,
      labels: [
        {
          type: 'alpha',
          label: 'latencyCycle',
        },
        {
          type: 'alpha',
          label: 'memoryType',
        },
        {
          type: 'alpha',
          label: 'frequency',
        },
        {
          type: 'int',
          label: 'memory',
        },
      ],
    },
    {
      category: ProductCategory.GraphicCard,
      labels: [
        {
          type: 'alpha',
          label: 'memoryChipset',
        },
        {
          type: 'alpha',
          label: 'connectorType',
        },
        {
          type: 'alpha',
          label: 'memoryType',
        },
        {
          type: 'alpha',
          label: 'memoryClocking',
        },
        {
          type: 'int',
          label: 'memory',
        },
      ],
    },
    {
      category: ProductCategory.HardDrive,
      labels: [
        {
          type: 'alpha',
          label: 'memoryInterface',
        },
        {
          type: 'alpha',
          label: 'memoryType',
        },
        {
          type: 'int',
          label: 'memory',
        },
      ],
    },
    {
      category: ProductCategory.Motherboard,
      labels: [
        {
          type: 'alpha',
          label: 'motherboardStandard',
        },
        {
          type: 'alpha',
          label: 'processorSocket',
        },
        {
          type: 'alpha',
          label: 'memoryType',
        },
        {
          type: 'int',
          label: 'maxMemory',
        },
      ],
    },
    {
      category: ProductCategory.PcCase,
      labels: [
        {
          type: 'num',
          label: 'width',
        },
        {
          type: 'num',
          label: 'length',
        },
        {
          type: 'num',
          label: 'depth',
        },
      ],
    },
    {
      category: ProductCategory.Processor,
      labels: [
        {
          type: 'alpha',
          label: 'processorType',
        },
        {
          type: 'alpha',
          label: 'socketType',
        },
        {
          type: 'int',
          label: 'numberOfCores',
        },
        {
          type: 'int',
          label: 'numberOfThreads',
        },
        {
          type: 'int',
          label: 'l3Capacity',
        },
      ],
    },
  ];

  getSelectedProductLabels(): any[] {
    if (this.selectedProductType === undefined) return [];
    const selectedProductCategory = this.productTypes.find(
      (productType) =>
        productType.category === this.selectedProductType.category
    );

    let labels = selectedProductCategory.labels
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
      if (key['type'] === 'alpha') {
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

    this.productApiService
      .productCreatePost({ body: product })
      .subscribe((v) => console.info(v));
  }

  urlToImageByByteData(data: any): string {
    const binaryData = Buffer.from(data, 'base64');
    const byteArray = new Uint8Array(binaryData);
    return URL.createObjectURL(new Blob([byteArray]));
  }

  handleUploadUrlToImage(file: File): string {
    return URL.createObjectURL(file);
  }

  loadImage(imageAsString: string): string {
    return this.urlToImageByByteData(imageAsString);
  }

  //upload image
  // handleUpload(event: any) {
  //   let file = event.files[0];
  //   this.imageUrl = this.handleUploadUrlToImage(file);
  //   this.handleUploadImageToByteArray(file);
  // }

  // handleUploadImageToByteArray(file: File): any {
  //   let reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onload = () => {
  //     const buffer = Buffer.from(new Uint8Array(reader.result as ArrayBuffer));
  //     const base64String = buffer.toString('base64');
  //     this.imageAsString = base64String;
  //     //change
  //     // this.imageUrl2 = this.loadImage(this.imageAsString);
  //   };
  // }

  handleUploadImageToByteArray2(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        const buffer = Buffer.from(
          new Uint8Array(reader.result as ArrayBuffer)
        );
        const base64String = buffer.toString('base64');
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  }
}
