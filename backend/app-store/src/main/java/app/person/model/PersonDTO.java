package app.person.model;

import app.address.model.Address;
import app.address.model.AddressDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PersonDTO {
    private Long bid;
    private String username;
    private String name;
    private String lastName;
    private List<AddressDTO> addresses;
}
