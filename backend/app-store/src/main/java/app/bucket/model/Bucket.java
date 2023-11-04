package app.bucket.model;


import adi.jpa.crud.model.BaseEntity;
import app.order.model.Order;
import app.person.model.Person;
import app.single_product_order.model.ProductOrder;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
public class Bucket extends BaseEntity {
    @Column(name = "ARCHIVED")
    private Boolean archived;

    @OneToMany(mappedBy = "bucket", fetch = FetchType.EAGER)
    private Set<ProductOrder> productOrders = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "BID")
    @ToString.Exclude
    @JsonIgnore
    private Person person;

    @OneToOne(mappedBy = "bucket")
    @ToString.Exclude
    @JsonIgnore
    private Order order;
}
