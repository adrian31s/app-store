import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory, ProductDto } from 'client/src/app/api/models';
import { ProductApiService } from 'client/src/app/api/services';
import { Table } from 'primeng/table';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from 'src/app/utils/ProductLabels';
import ProductUtil from 'src/app/utils/ProductUtil';

@Component({
  selector: 'app-product-updater',
  templateUrl: './product-updater.component.html',
  styleUrls: ['./product-updater.component.css'],
})
export class ProductUpdaterComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  products: ProductDto[] = [];
  selectedProducts: ProductDto[] = []; //to consider if delete will be implemented
  selectedProductCategory?: any;

  //labels
  productCommonFields: any[];
  productTypes: any[];

  //onUpdate
  productToUpdate?: ProductDto;
  productDetailModel?: any;

  constructor(private productApiService: ProductApiService) {
    this.productCommonFields = productCommonFieldsUtil;
    this.productTypes = productTypesFieldsUtil;
  }

  ngOnInit(): void {
    this.productApiService.getProducts().subscribe({
      next: (val) => {
        this.products = val;
      },
    });
  }

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
    return ProductUtil.getProductDetailModel(productDTO);
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

  openEditProductDialog(product: ProductDto) {
    this.productToUpdate = product;
    this.productDetailModel = ProductUtil.getProductDetailModel(
      this.productToUpdate
    );
  }
}
