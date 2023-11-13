package app.bucket.service;

import app.bucket.model.Bucket;
import app.bucket.model.BucketDTO;
import app.single_product_order.service.ProductOrderMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(uses = ProductOrderMapper.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BucketMapper {
    @Mapping(source = "bucket.person.bid", target = "personId")
    @Mapping(source = "bucket.order.bid", target = "orderId")
    BucketDTO mapToDTO(Bucket bucket);
}
