import { Component } from '@angular/core';
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
    const selectedProductType = this.productTypes.find(
      (productType) =>
        productType.category === this.selectedProductType.category
    );
    return selectedProductType?.labels;
  }

  getNumberOfInputsArray(): any[] {
    let labels = this.getSelectedProductLabels();
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

  createProduct(){
    let product:Product={};
    product.thumbnailAsByte=this.uploadedThumbnailAsString;
    product.picturesAsBytes=this.uploadedPicturesAsString;
    product.name=(<HTMLInputElement>document.getElementById("name")).value;
    product.producer=(<HTMLInputElement>document.getElementById("producer")).value;
    product.guarantee=(<HTMLInputElement>document.getElementById("guarantee")).value;
    product.model=(<HTMLInputElement>document.getElementById("model")).value;
    product.price=Number((<HTMLInputElement>document.getElementById("price")).value);
    product.quantity=Number((<HTMLInputElement>document.getElementById("quantity")).value);
   
    switch(this.selectedProductType.category){
      case ProductCategory.Charger:{
          let charger:Charger={};
          charger.coolingType=(<HTMLInputElement>document.getElementById("coolingType")).value;
          charger.depth=Number((<HTMLInputElement>document.getElementById("depth")).value);
          charger.height=Number((<HTMLInputElement>document.getElementById("height")).value);
          charger.noise=Number((<HTMLInputElement>document.getElementById("noise")).value);
          charger.power=(<HTMLInputElement>document.getElementById("power")).value;
          charger.standard=(<HTMLInputElement>document.getElementById("standard")).value;
          charger.width=Number((<HTMLInputElement>document.getElementById("width")).value);
          product.charger=charger;
          break;
      }
      case ProductCategory.Cooler:{
        let cooler:Cooler={};
        cooler.coolerType=(<HTMLInputElement>document.getElementById("coolerType")).value;
        cooler.maxRotationSpeed=Number((<HTMLInputElement>document.getElementById("maxRotationSpeed")).value);
        cooler.maxVolume=Number((<HTMLInputElement>document.getElementById("maxVolume")).value);
        cooler.supplyVoltage=Number((<HTMLInputElement>document.getElementById("supplyVoltage")).value);
        cooler.type=(<HTMLInputElement>document.getElementById("type")).value;
        product.cooler=cooler;
        break;
      }
      case ProductCategory.DramMemory:{
        let dramMemory:DramMemory={};
        dramMemory.frequency=(<HTMLInputElement>document.getElementById("frequency")).value;
        dramMemory.latencyCycle=(<HTMLInputElement>document.getElementById("latencyCycle")).value;
        dramMemory.memory=Number((<HTMLInputElement>document.getElementById("memory")).value);
        dramMemory.memoryType=(<HTMLInputElement>document.getElementById("memoryType")).value;
        product.dramMemory=dramMemory;
        break;
      }
      case ProductCategory.GraphicCard:{
        let graphicCart:GraphicCard={};
        graphicCart.connectorType=(<HTMLInputElement>document.getElementById("connectorType")).value;
        graphicCart.memory=Number((<HTMLInputElement>document.getElementById("memory")).value);
        graphicCart.memoryChipset=(<HTMLInputElement>document.getElementById("memoryChipset")).value;
        graphicCart.memoryClocking=(<HTMLInputElement>document.getElementById("memoryClocking")).value;
        graphicCart.memoryType=(<HTMLInputElement>document.getElementById("memoryType")).value;
        product.graphicCard=graphicCart;
        break;
      }
      case ProductCategory.HardDrive:{
        let hardDrive:HardDrive={};
        hardDrive.memory=Number((<HTMLInputElement>document.getElementById("memory")).value);
        hardDrive.memoryInterface=(<HTMLInputElement>document.getElementById("memoryInterface")).value;
        hardDrive.memoryType=(<HTMLInputElement>document.getElementById("memoryType")).value;
        product.hardDrive=hardDrive;
        break;
      }
      case ProductCategory.Motherboard:{
        let motherboard:Motherboard={};
        motherboard.maxMemory=Number((<HTMLInputElement>document.getElementById("maxMemory")).value);
        motherboard.memoryType=(<HTMLInputElement>document.getElementById("memoryType")).value;
        motherboard.motherboardStandard=(<HTMLInputElement>document.getElementById("motherboardStandard")).value;
        motherboard.processorSocket=(<HTMLInputElement>document.getElementById("processorSocket")).value;
        product.motherboard=motherboard;
        break;
      }
      case ProductCategory.PcCase:{
        let pcCase:PcCase={};
        pcCase.depth=Number((<HTMLInputElement>document.getElementById("depth")).value);
        pcCase.width=Number((<HTMLInputElement>document.getElementById("width")).value);
        pcCase.length=Number((<HTMLInputElement>document.getElementById("length")).value);
        product.pcCase=pcCase;
        break;
      }
      case ProductCategory.Processor:{
        let processor:Processor={};
        processor.l3Capacity=Number((<HTMLInputElement>document.getElementById("l3Capacity")).value);
        processor.numberOfCores=Number((<HTMLInputElement>document.getElementById("numberOfCores")).value);
        processor.numberOfThreads=Number((<HTMLInputElement>document.getElementById("numberOfThreads")).value);
        processor.processorType=(<HTMLInputElement>document.getElementById("processorType")).value;
        processor.socketType=(<HTMLInputElement>document.getElementById("socketType")).value;
        product.processor=processor;
        break;
      }
    }

    this.productApiService
      .productCreatePost({ body: product })
      .subscribe((v) => console.info);
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
