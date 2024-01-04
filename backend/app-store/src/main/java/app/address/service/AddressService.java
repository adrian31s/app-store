package app.address.service;

import app.address.dao.AddressDao;
import app.address.model.Address;
import app.address.model.AddressSearchCriteria;
import app.person.model.Person;
import io.netty.util.internal.StringUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class AddressService {
    private final AddressDao dao;

    @Inject
    public AddressService(AddressDao dao) {
        this.dao = dao;
    }

    public List<Address> getAll() {
        return dao.getAllEntities();
    }

    public Address getById(Long id) {
        return dao.getById(id);
    }

    public Address createAddress(Address address) {
        return dao.createEntity(address);
    }

    public void deleteAddressById(Long id) {
        dao.deleteById(id);
    }

    public int updateById(Long id, AddressSearchCriteria searchCriteria) {
        return dao.updateEntitiesFieldsById(id, getPredicates(searchCriteria));
    }

    public List<Address> getByMultipleValues(AddressSearchCriteria searchCriteria) {
        return dao.getEntitiesByMultipleFields(getPredicates(searchCriteria));
    }

    public List<Address> getAddressesByPersonId(Long personId){
        return dao.getAddressByPersonId(personId);
    }

    public void addPerson(Long addressId, Person person) {
        Address address = dao.getById(addressId);
        if (address == null) return;
        address.getPersonSet().add(person);
        dao.updateEntity(address);
    }


    public void removePerson(Long addressId, Person person) {
        Address address = getById(addressId);
        if (address == null) return;
        if (address.getPersonSet().remove(person)) {
            dao.updateEntity(address);
        }
        if (address.getPersonSet().isEmpty()) {
            dao.deleteById(address.getBid());
        }
    }

    public HashMap<String, Object> getPredicates(AddressSearchCriteria searchCriteria) {
        HashMap<String, Object> predicates = new HashMap<>();
        if (!StringUtil.isNullOrEmpty(searchCriteria.getProvince()) && !searchCriteria.getProvince().isBlank()) {
            predicates.put("province", searchCriteria.getProvince());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getZipCode()) && !searchCriteria.getZipCode().isBlank()) {
            predicates.put("zipCode", searchCriteria.getZipCode());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getStreetName()) && !searchCriteria.getStreetName().isBlank()) {
            predicates.put("streetName", searchCriteria.getStreetName());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getBuildingNumber()) && !searchCriteria.getBuildingNumber().isBlank()) {
            predicates.put("buildingNumber", searchCriteria.getBuildingNumber());
        }

        if (searchCriteria.getApartmentNumber() != 0) {
            if (searchCriteria.getApartmentNumber() == -1)
                predicates.put("apartmentNumber", null);
            else
                predicates.put("apartmentNumber", searchCriteria.getApartmentNumber());
        }
        return predicates;
    }
}
