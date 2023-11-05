package app.product.types.motherboard.service;

import app.product.types.motherboard.model.Motherboard;
import app.product.types.motherboard.model.MotherboardDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface MotherboardMapper {
    MotherboardDTO mapToDTO(Motherboard motherboard);
}
