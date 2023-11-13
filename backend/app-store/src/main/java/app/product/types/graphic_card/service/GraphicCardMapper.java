package app.product.types.graphic_card.service;

import app.product.types.graphic_card.model.GraphicCard;
import app.product.types.graphic_card.model.GraphicCardDTO;
import org.mapstruct.Mapper;

@Mapper()
public interface GraphicCardMapper {
    GraphicCardDTO mapToDTO(GraphicCard graphicCard);
}
