package app.single_product_order.model;

import app.product.model.ProductDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOrderDTO {
    private int quantityProductOrder;
    private ProductDTO productDTO;
    private Long bucketId;
}
