package app.product.types.cooler.service;

import app.product.types.cooler.model.Cooler;
import app.product.types.cooler.model.CoolerDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface CoolerMapper {
    CoolerDTO mapToDTO(Cooler cooler);
}
