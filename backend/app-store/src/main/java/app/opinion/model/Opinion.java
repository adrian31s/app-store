package app.opinion.model;

import adi.jpa.crud.model.BaseEntity;
import app.product.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Opinion extends BaseEntity {
    @Column(name = "COMMENT")
    private String comment;

    @Column(name = "RATE")
    private Float rate;

    @Column(name = "USERNAME")
    private String username;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "BID")
    @ToString.Exclude
    @JsonIgnore
    private Product product;
}
