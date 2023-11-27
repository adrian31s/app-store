import { ProductDto, ProductCategory } from "client/src/app/api/models";

export default class ProductUtil {
    static  getProductDetailModel(productDTO: ProductDto): any {
        switch (productDTO.productCategory) {
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
