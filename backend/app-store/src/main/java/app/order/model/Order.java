package app.order.model;

import adi.jpa.crud.model.BaseEntity;
import app.address.model.Address;
import app.bucket.model.Bucket;
import app.order.model.utill.Status;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name = Order.TABLE)
public class Order extends BaseEntity {
    public static final String TABLE = "ORDERS";
    @Column(name = "ODERED")
    private Date ordered;

    @Column(name = "DELIVERED")
    private Date delivered;

    @Column(name = "STATUS")
    private Status status;

    @Column(name = "TOTAL_PRICE")
    private Double totalPrice;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bucket_id", referencedColumnName = "BID")
    private Bucket bucket;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "BID")
    private Address deliveryAddress;
}
