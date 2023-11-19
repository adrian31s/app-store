import { Component, ViewChild } from '@angular/core';
import { ProductCategory, ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-product-updater',
  templateUrl: './product-updater.component.html',
  styleUrls: ['./product-updater.component.css'],
})
export class ProductUpdaterComponent {
  @ViewChild('dt') dt: Table | undefined;

  products: ProductDto[] = [];
  selectedProducts: ProductDto[] = [];
  selectedProductCategory?: any;

  constructor(private productApiService: ProductApiService) {
    this.productApiService.productGetAllGet().subscribe({
      next: (val) => {
        this.products = val;
      },
    });
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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  setSelectedProductCategory(selectedProductCategory: any) {
    this.selectedProductCategory = selectedProductCategory;
  }

  getSelectedProductLabels(): any[] {
    if (this.selectedProductCategory === undefined) return [];
    const selectedProductCategory = this.productTypes.find(
      (productType) =>
        productType.category === this.selectedProductCategory.category
    );

    let labels = selectedProductCategory.labels;
    if (labels === undefined || labels.length === 0) return [];
    return labels;
  }

  getProductDetailModel(productDTO: ProductDto): any {
    switch (this.selectedProductCategory.category) {
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

  isPropertyDefined(obj: any, prop: string): obj is { [key: string]: any } {
    return obj[prop] !== null && obj[prop] !== undefined;
  }

  filterProductsByCategory(): ProductDto[] {
    const filteredProducts = this.products.filter(
      (p) => p.productCategory === this.selectedProductCategory.category
    );
    return filteredProducts;
  }

  productToUpdate?: ProductDto;
  productDetailModel?:any;

  openEditProductDialog(product: ProductDto) {
    this.productToUpdate = product;
    this.productDetailModel=this.getProductDetailModel(this.productToUpdate);
  }
}
