package app.opinion.rs.v1.dto;


import app.opinion.model.Opinion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper()
public interface OpinionMapper {
    @Mapping(source = "opinion.product.bid", target = "productId")
    OpinionDto mapToDTO(Opinion opinion);

    List<OpinionDto> mapList(List<Opinion> opinions);
}