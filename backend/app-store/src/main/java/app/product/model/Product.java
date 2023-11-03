package app.product.model;

import adi.jpa.crud.model.BaseEntity;
import app.product.model.utill.ProductCategory;
import app.product.types.charger.model.Charger;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@Getter
@Setter
public class Product extends BaseEntity {
    @Column(name = "CATEGORY")
    private ProductCategory productCategory;

    @Column(name = "NAME")
    private String name;

    @Column(name = "PRODUCER")
    private String producer;

    @Column(name = "GUARANTEE")
    private String guarantee;

    @Column(name = "MODEL")
    private String model;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "QUANTITY")
    private int quantity;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "charger_id", referencedColumnName = "BID")
    private Charger charger;
}
