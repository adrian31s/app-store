package app.product.types.charger.model;

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
public class Charger extends BaseEntity {
    @Column(name = "POWER")
    private String power;

    @Column(name = "STANDARD")
    private String standard;

    @Column(name = "NOISE")
    private int noise;

    @Column(name = "COOLING_TYPE")
    private String coolingType;

    @Column(name = "WIDTH")
    private int width;

    @Column(name = "HEIGHT")
    private int height;

    @Column(name = "DEPTH")
    private int depth;

    @OneToOne(mappedBy = "charger")
    @ToString.Exclude
    @JsonIgnore
    private Product product;
}
