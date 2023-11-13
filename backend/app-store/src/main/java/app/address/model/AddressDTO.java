package app.address.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {
    private Long bid;
    private String province;
    private String zipCode;
    private String streetName;
    private String buildingNumber;
    private int apartmentNumber;
}
