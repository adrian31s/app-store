package app.product.types.dram_memory.model;

import adi.jpa.crud.model.BaseEntity;
import app.product.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
@ToString
@Getter
@Setter
public class DRAMMemory extends BaseEntity {
    @Column(name = "LATENCY_CYCLE")
    private String latencyCycle;

    @Column(name = "MEMORY")
    private int memory;

    @Column(name = "MEMORY_TYPE")
    private String memoryType;

    @Column(name = "FREQUENCY")
    private String frequency;

    @OneToOne(mappedBy = "dramMemory")
    @ToString.Exclude
    @JsonIgnore
    private Product product;
}
