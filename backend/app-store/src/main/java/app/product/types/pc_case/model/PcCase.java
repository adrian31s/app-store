package app.product.types.pc_case.model;

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
public class PcCase extends BaseEntity {
    @Column(name = "WIDTH")
    private Double width;

    @Column(name = "LENGTH")
    private Double length;

    @Column(name = "DEPTH")
    private Double depth;

    @OneToOne(mappedBy = "pcCase")
    @ToString.Exclude
    @JsonIgnore
    private Product product;
}
