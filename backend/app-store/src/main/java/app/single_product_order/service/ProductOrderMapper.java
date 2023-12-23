package app.single_product_order.service;

import app.single_product_order.model.ProductOrder;
import app.single_product_order.model.ProductOrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;

@Mapper()
public interface ProductOrderMapper {
    @Mapping(source = "product.bid", target = "productId")
    @Mapping(source = "bucket.bid", target = "bucketId")
    ProductOrderDTO mapToDTO(ProductOrder productOrder);

    List<ProductOrderDTO> mapListToDTO(Set<ProductOrder> productOrders);
}
