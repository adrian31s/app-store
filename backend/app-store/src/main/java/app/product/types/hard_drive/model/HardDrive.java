package app.product.types.hard_drive.model;

import adi.jpa.crud.model.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.print.DocFlavor;

@Entity
@ToString
@Getter
@Setter
public class HardDrive extends BaseEntity {
    @Column(name = "MEMORY_INTERFACE")
    private String memoryInterface;

    @Column(name = "MEMORY")
    private int memory;

    @Column(name = "MEMORY_TYPE")
    private String memoryType;
}
