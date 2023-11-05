package app.product.types.graphic_card.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GraphicCardDTO {
    private String memoryChipset;
    private int memory;
    private String connectorType;
    private String memoryType;
    private String memoryClocking;

}
