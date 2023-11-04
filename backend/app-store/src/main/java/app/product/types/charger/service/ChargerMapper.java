package app.product.types.charger.service;

import app.product.types.charger.model.Charger;
import app.product.types.charger.model.ChargerDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface ChargerMapper {
    ChargerDTO mapToDTO(Charger charger);
}
