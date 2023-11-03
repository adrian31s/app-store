package app.product.types.graphic_card.model;

import adi.jpa.crud.model.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@ToString
@Getter
@Setter
public class GraphicCard extends BaseEntity {
    @Column(name = "MOTHER_BOARD_CHIPSET")
    private String memoryChipset;

    @Column(name = "MEMORY")
    private int memory;

    @Column(name = "CONNECTOR_TYPE")
    private String connectorType;

    @Column(name = "MEMORY_TYPE")
    private String memoryType;

    @Column(name = "MEMORY_CLOCKING")
    private String memoryClocking;

}
