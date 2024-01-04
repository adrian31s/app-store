package app.address.model;

import adi.jpa.crud.model.BaseEntity;
import app.order.model.Order;
import app.person.model.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@Entity
@ToString
@Table(name = Address.TABLE)
public class Address extends BaseEntity {
    public static final String TABLE = "ADDRESS";

    @Column(name = "PROVINCE")
    private String province;

    @Column(name = "ZIP_CODE")
    private String zipCode;

    @Column(name = "STREET_NAME")
    private String streetName;

    @Column(name = "BUILDING_NUMBER")
    private String buildingNumber;

    @Column(name = "APARTMENT_NUMBER")
    private int apartmentNumber;

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "addresses", cascade = {CascadeType.PERSIST})
    private Set<Person> personSet = new HashSet<>();

    @OneToMany(mappedBy = "deliveryAddress")
    @ToString.Exclude
    @JsonIgnore
    private Set<Order> orders=  new HashSet<>();
}
