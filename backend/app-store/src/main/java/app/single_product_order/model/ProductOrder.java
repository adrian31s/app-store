package app.single_product_order.model;

import adi.jpa.crud.model.BaseEntity;
import app.bucket.model.Bucket;
import app.product.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@ToString
public class ProductOrder extends BaseEntity {
    @Column(name = "QUANTITY_PRODUCT_ORDER")
    private int quantityProductOrder;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", referencedColumnName = "BID")
    @ToString.Exclude
    private Product product;

    @ManyToOne
    @JoinColumn(name = "bucket_id", referencedColumnName = "BID")
    @ToString.Exclude
    @JsonIgnore
    private Bucket bucket;
}
