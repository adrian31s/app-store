package app.product.types.cooler.model;

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
public class Cooler extends BaseEntity {
    @Column(name = "TYPE")
    private String type;

    @Column(name = "MAMX_ROTATION_SPEED")
    private int maxRotationSpeed;

    @Column(name = "MAX_VOLUME")
    private int maxVolume;

    @Column(name = "SUPPLY_VOLTAGE")
    private int supplyVoltage;

    @Column(name = "COOLER_TYPE")
    private String coolerType;

    @OneToOne(mappedBy = "cooler")
    @ToString.Exclude
    @JsonIgnore
    private Product product;
}
