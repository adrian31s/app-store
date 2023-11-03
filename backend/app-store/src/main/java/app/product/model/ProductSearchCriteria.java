package app.product.model;

import app.product.model.utill.ProductCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductSearchCriteria {
    private ProductCategory productCategory;
    private String name;
    private String producer;
    private String guarantee;
    private String model;
    private String price;
    private int quantity;
}
