package app.address.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressSearchCriteria {
    private String province;
    private String zipCode;
    private String streetName;
    private String buildingNumber;
    private int apartmentNumber;
}
