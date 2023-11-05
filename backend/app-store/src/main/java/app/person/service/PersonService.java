package app.person.service;

import app.address.dao.AddressDao;
import app.address.model.Address;
import app.address.service.AddressService;
import app.bucket.model.Bucket;
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

    public int updateById(Long id, PersonSearchCriteria searchCriteria) {
        return dao.updateEntitiesFieldsById(id, getPredicates(searchCriteria));
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public void removeAddress(Long personId, Long addressId) {
        Person person = dao.getById(personId);
        Address address = addressDao.getById(addressId);
        if (person == null || address == null) return;

        person.getAddresses().remove(address);
        dao.updateEntity(person);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Person addAddress(Long personId, Long addressId) {
        Person person = dao.getById(personId);
        if (person == null) return null;
        Address address = addressDao.getById(addressId);
        if (address == null) return null;

        person.getAddresses().add(address);
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
