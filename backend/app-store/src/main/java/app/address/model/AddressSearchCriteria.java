package app.address.model;

import io.netty.util.internal.StringUtil;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

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
