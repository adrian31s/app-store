package app.address.model;

import adi.jpa.crud.model.BaseEntity;
import app.person.model.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
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
    @OneToMany(mappedBy = "address",cascade = CascadeType.ALL)
    private Set<Person> personSet = new HashSet<>();
}
