package app.person.service;

import app.address.mapper.AddressMapper;
import app.person.model.Person;
import app.person.model.PersonDTO;
import app.person.model.PersonSearchCriteria;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(uses = AddressMapper.class, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PersonMapper {
    PersonDTO mapToDTO(Person person);

    List<PersonDTO> mapToListDTO(List<Person> people);

    PersonSearchCriteria mapToSearchCriteria(Person person);
}
