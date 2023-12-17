import { Component } from '@angular/core';
import {
  ProductCategory,
  ProductEnhancedSearchCriteria,
} from 'client/src/app/api/models';
import {
  productCommonFieldsUtil,
  productTypesFieldsUtil,
} from '../../utils/ProductLabels';
import { ProductApiService } from 'client/src/app/api/services';
import { error } from 'console';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  productCategories = Object.keys(ProductCategory);
  selectedCategory?: ProductCategory;
  selectedCategoryAsString!:string;
  selectedProductLabels?: any[];
  filterValues = new Map<string, any>();

  productCommonFields = productCommonFieldsUtil;
  productTypesFieldsUtil = productTypesFieldsUtil;

  constructor(private productApi:ProductApiService){
  }


  setSelectedCategory(selectedCategoryAsString: string) {
    this.selectedCategory =
      ProductCategory[selectedCategoryAsString as keyof typeof ProductCategory];
    this.selectedCategoryAsString=selectedCategoryAsString;
    this.selectedProductLabels = this.getSelectedProductLabels();
    this.createPlaceHolderForFilterValues();
  }

  createPlaceHolderForFilterValues() {
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

  display() {
    let searchCriteria: ProductEnhancedSearchCriteria = {};
    this.productApi.getProductsBySearchCriteria({body:searchCriteria}).subscribe(
      (value) =>{
        console.log(value);
      },
      (error)=>{
        console.error(error);
      }
    )
    this.fillFilterFields(this.productCommonFields, searchCriteria);
    if (this.selectedProductLabels !== undefined){
      this.fillFilterFields(this.selectedProductLabels, searchCriteria);
      searchCriteria.productCategoryProperty=this.selectedCategoryAsString;
      
    }
    console.log(searchCriteria);
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
}
