package app.bucket.model;

import app.single_product_order.model.ProductOrder;
import app.single_product_order.model.ProductOrderDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BucketDTO {
    private Long bid;
    private Boolean archived;
    private List<ProductOrderDTO> productOrders;
    private Long personId;
    private Long orderId;
}
