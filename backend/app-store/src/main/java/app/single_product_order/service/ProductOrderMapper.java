package app.single_product_order.service;

import app.product.service.mapper.ProductMapper;
import app.single_product_order.model.ProductOrder;
import app.single_product_order.model.ProductOrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;
import java.util.Set;

@Mapper(uses = ProductMapper.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ProductOrderMapper {
    @Mapping(source = "bucket.bid", target = "bucketId")
    @Mapping(source = "product", target = "productDTO")
    ProductOrderDTO mapToDTO(ProductOrder productOrder);

    List<ProductOrderDTO> mapListToDTO(Set<ProductOrder> productOrders);
}
