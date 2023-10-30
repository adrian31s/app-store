package app.person.service;

import app.address.dao.AddressDao;
import app.address.model.Address;
import app.address.service.AddressService;
import app.person.dao.PersonDao;
import app.person.model.Person;
import app.person.model.PersonSearchCriteria;
import io.netty.util.internal.StringUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class PersonService {
    @Inject
    PersonDao dao;

    @Inject
    AddressService addressService;

    @Inject
    AddressDao addressDao;

    public List<Person> getAll() {
        return dao.getAllEntities();
    }

    public Person getById(Long id) {
        return dao.getById(id);
    }

    public Person createPerson(Person person) {
        return dao.createEntity(person);
    }

    public void deletePersonById(Long id) {
        dao.deleteById(id);
    }

    public int updateById(Long id, PersonSearchCriteria searchCriteria) {
        return dao.updateEntitiesFieldsById(id, getPredicates(searchCriteria));
    }


    public void removeAddress(Long personId) {
        Person person = dao.getById(personId);
        if (person == null || person.getAddress() == null) return;
        Long addressId = person.getAddress().getBid();
        person.setAddress(null);
        dao.updateEntity(person);
        addressService.removePerson(addressId, person);
    }

    public Person addAddress(Long personId, Long addressId) {
        Person person = dao.getById(personId);
        if (person == null) return null;
        if (person.getAddress() != null) {
            removeAddress(personId);
        }
        addressService.addPerson(addressId, person);
        person.setAddress(addressService.getById(addressId));
        return dao.updateEntity(person);
    }

    public HashMap<String, Object> getPredicates(PersonSearchCriteria searchCriteria) {
        HashMap<String, Object> predicates = new HashMap<>();
        if (!StringUtil.isNullOrEmpty(searchCriteria.getUsername()) && !searchCriteria.getUsername().isBlank()) {
            predicates.put("username", searchCriteria.getUsername());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getName()) && !searchCriteria.getName().isBlank()) {
            predicates.put("name", searchCriteria.getName());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getLastName()) && !searchCriteria.getLastName().isBlank()) {
            predicates.put("lastName", searchCriteria.getLastName());
        }

        return predicates;
    }

}
