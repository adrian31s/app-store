package app.address.mapper;

import app.address.model.Address;
import app.address.model.AddressDTO;
import app.address.model.AddressSearchCriteria;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper()
public interface AddressMapper {

    Address toAddress(AddressSearchCriteria searchCriteria);

    AddressSearchCriteria toSearchCriteria(Address address);

    AddressDTO mapToDTO(Address address);

    List<AddressDTO> mapToListDTO(List<Address> addresses);
}
