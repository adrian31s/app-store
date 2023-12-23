package app.person.model;

import adi.jpa.crud.model.BaseEntity;
import app.address.model.Address;
import app.bucket.model.Bucket;
import app.person.model.utill.Role;
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
@Table(name = Person.TABLE)
public class Person extends BaseEntity {
    public static final String TABLE = "PERSON";

    @Column(name = "USERNAME", unique = true)
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL", unique = true)
    private String email;

    @Column(name = "ROLE")
    private Role role;

    @Column(name = "NAME")
    private String name;

    @Column(name = "LAST_NAME")
    private String lastName;


    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "person_to_address",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "address_id"))
    @ToString.Exclude
    private Set<Address> addresses;

    @ToString.Exclude
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Bucket> buckets = new HashSet<>();
}
