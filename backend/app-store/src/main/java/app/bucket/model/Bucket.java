package app.bucket.model;


import adi.jpa.crud.model.BaseEntity;
import app.person.model.Person;
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

    @Column(name = "TOTAL_PRICE")
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "BID")
    @ToString.Exclude
    private Person person;


}
