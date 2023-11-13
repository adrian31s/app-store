package app.single_product_order.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOrderDTO {
    private int quantityProductOrder;
    private Long productId;
    private Long bucketId;
}
