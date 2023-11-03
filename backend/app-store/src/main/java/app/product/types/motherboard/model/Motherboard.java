package app.product.types.motherboard.model;

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
public class Motherboard extends BaseEntity {
    @Column(name = "MOTHERBOARD_STANDARD")
    private String motherboardStandard;

    @Column(name = "PROCESSOR_SOCKET")
    private String processorSocket;

    @Column(name = "MEMORY_TYPE")
    private String memoryType;

    @Column(name = "MAX_MEMORY")
    private int maxMemory;

}
