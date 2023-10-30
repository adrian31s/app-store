package app.address.mapper;

import app.address.model.Address;
import app.address.model.AddressSearchCriteria;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface AddressMapper {

    Address toAddress (AddressSearchCriteria searchCriteria);
    AddressSearchCriteria toSearchCriteria (Address address);

}
