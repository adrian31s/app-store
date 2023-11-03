package app.product.types.processor.model;

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
public class Processor extends BaseEntity {
    @Column(name = "PROCESSOR_TYPE")
    private String processorType;

    @Column(name = "SOCKET_TYPE")
    private String socketType;

    @Column(name = "NUMBER_OF_CORES")
    private int numberOfCores;

    @Column(name = "NUMBER_OF_THREADS")
    private int numberOfThreads;

    @Column(name = "L3_CAPACITY")
    private int l3Capacity;
}
