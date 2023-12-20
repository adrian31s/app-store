import { Component, EventEmitter, Output } from '@angular/core';
import {
  ProductCategory,
  ProductDto,
  ProductEnhancedSearchCriteria,
} from 'client/src/app/api/models';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from '../../utils/ProductLabels';
import { ProductApiService } from 'client/src/app/api/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() filteredProductsEmitter = new EventEmitter<ProductDto[]>();

  productCategories = Object.keys(ProductCategory);
  selectedCategory?: ProductCategory;
  selectedCategoryAsString!: string;
  selectedProductLabels: any[] = [];
  filterValues = new Map<string, any>();

  productCommonFields = productCommonFieldsUtil;
  productTypesFieldsUtil = productTypesFieldsUtil;

  constructor(
    private productApi: ProductApiService,
    private messageService: MessageService
  ) {}

  setSelectedCategory(selectedCategoryAsString: string) {
    this.selectedCategory =
      ProductCategory[selectedCategoryAsString as keyof typeof ProductCategory];
    this.selectedCategoryAsString = selectedCategoryAsString;
    this.selectedProductLabels = this.getSelectedProductLabels();
    this.createPlaceHolderForFilterValues();
  }

  createPlaceHolderForFilterValues() {
    this.filterValues.clear();
    for (let productCommonField of this.productCommonFields) {
      if (
        productCommonField['filtering'] === true ||
        productCommonField['selecting'] === true
      )
        this.filterValues.set(productCommonField['label'], '');
    }
    if (this.selectedProductLabels !== undefined)
      for (let productTypesField of this.selectedProductLabels) {
        if (
          productTypesField['filtering'] === true ||
          productTypesField['selecting'] === true
        )
          this.filterValues.set(productTypesField['label'], '');
      }
  }

  getSelectedProductLabels(): any[] {
    if (this.selectedCategory === undefined) return [];
    const selectedProductCategory = this.productTypesFieldsUtil.find(
      (productType) => productType.category === this.selectedCategory
    );

    let labels = selectedProductCategory.labels;
    if (labels === undefined || labels.length === 0) return [];
    return labels;
  }

  filter() {
    if (this.selectedProductLabels === undefined) {
      return;
    }

    let searchCriteria: ProductEnhancedSearchCriteria = {};
    this.fillFilterFields(this.productCommonFields, searchCriteria);
    this.fillFilterFields(this.selectedProductLabels, searchCriteria);

    //to fit product property which starts with small letter
    searchCriteria.productCategoryProperty =
      this.selectedCategoryAsString.charAt(0).toLowerCase() +
      this.selectedCategoryAsString.slice(1);

    this.productApi
      .getProductsBySearchCriteria({ body: searchCriteria })
      .subscribe(
        (value) => {
          this.messageService.add({
            severity: 'success',
            summary: 'wyszukiwanie zakonczone',
            detail: 'znaleziono: ' + value.length,
          });
          this.emitFilteredProducts(value);
        },
        (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'blad wyszukiwania',
            detail: '',
          });
        }
      );
  }

  private fillFilterFields(
    productFields: any[],
    searchCriteria: ProductEnhancedSearchCriteria
  ) {
    for (let productField of productFields) {
      let filteValue = this.filterValues.get(productField['label']);
      if (
        filteValue !== undefined &&
        filteValue.length > 0 &&
        filteValue !== ''
      ) {
        if (productField['selecting'] === true) {
          this.fillObjects(
            searchCriteria,
            productField['label'],
            'in;' + filteValue
          );
        } else if (productField['type'] === 'text') {
          this.fillObjects(
            searchCriteria,
            productField['label'],
            'like;%' + filteValue + '%'
          );
        } else {
          this.fillObjects(searchCriteria, productField['label'], filteValue);
        }
      }
    }
  }

  private fillObjects(obj: any, key: any, values: string) {
    obj[key] = values;
  }

  private emitFilteredProducts(productDtos: ProductDto[]) {
    this.filteredProductsEmitter.emit(productDtos);
  }
}
