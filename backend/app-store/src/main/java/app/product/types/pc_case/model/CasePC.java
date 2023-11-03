package app.product.types.pc_case.model;

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
public class CasePC extends BaseEntity {
    @Column(name = "WIDTH")
    private Double width;

    @Column(name = "LENGTH")
    private Double length;

    @Column(name = "DEPTH")
    private Double depth;

}
