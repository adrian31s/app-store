package app.order.service;

import app.order.model.Order;
import app.order.model.OrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;

@Mapper()
public interface OrderMapper {
    @Mapping(source = "order.bucket.bid", target = "bucketId")
    OrderDTO mapToDTO(Order order);
    List<OrderDTO> mapToListDTO(Set<Order> orders);
}
