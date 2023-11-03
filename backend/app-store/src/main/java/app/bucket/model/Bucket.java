package app.bucket.model;


import adi.jpa.crud.model.BaseEntity;
import app.order.model.Order;
import app.person.model.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class Bucket extends BaseEntity {
    @Column(name = "ARCHIVED")
    private Boolean archived;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "BID")
    @ToString.Exclude
    private Person person;

    @OneToOne(mappedBy = "bucket")
    @ToString.Exclude
    @JsonIgnore
    private Order order;
}
