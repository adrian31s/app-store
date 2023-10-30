package app;

import app.address.dao.AddressDao;
import app.address.factory.AddressFactory;
import app.address.model.Address;
import app.address.service.AddressService;
import app.person.dao.PersonDao;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import app.person.service.PersonService;
import io.quarkus.narayana.jta.QuarkusTransaction;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class ExampleResourceTest {
    @Inject
    AddressDao addressDao;
    @Inject
    PersonDao personDao;
    @Inject
    PersonService personService;
    @Inject
    AddressService addressService;

    Long personId;
    Long person1Id;
    Long person2Id;
    Long person3Id;

    Long addressId;
    Long address1Id;
    Long address2Id;


    @BeforeEach
    public void setup() {
        personId = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();
        person1Id = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();
        person2Id = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();
        person3Id = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();

        addressId = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();
        address1Id = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();
        address2Id = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();

        addPeopleToAddress(addressId, personId);
        addPeopleToAddress(address1Id, person1Id, person2Id);
        addPeopleToAddress(address2Id, person3Id);
    }

    @AfterEach
    public void cleanUp() {
        personDao.deleteAll();
        addressDao.deleteAll();

    }

    @Test
    public void shouldPersistAllDataBeforeEach() {
        //then
        Assertions.assertEquals(3, addressDao.getAllEntities().size());
        Assertions.assertEquals(4, personDao.getAllEntities().size());
    }

    @Test
    public void shouldDeletePersonFromAddressListWhenPersonDeleteAddress() {
        //when
        personService.removeAddress(personId);
        personService.removeAddress(person1Id);

        //then
        Address addressWithOnePerson = addressService.getById(address1Id);
        Person person = personDao.getById(personId);
        Person person1 = personDao.getById(person1Id);

        Assertions.assertNull(person.getAddress());
        Assertions.assertNull(person1.getAddress());
        Assertions.assertEquals(2, addressDao.getAllEntities().size());
        Assertions.assertEquals(1, addressWithOnePerson.getPersonSet().size());

    }

    @Test
    public void shouldChangePersonAddressWhenAddAddress() {
        //when
        personService.addAddress(personId, address1Id);

        //then
        Address addressWithThreePeople = addressService.getById(address1Id);
        Person personWithChangedAddress = personService.getById(personId);
        int activeAddresses = addressDao.getAllEntities().size();

        Assertions.assertEquals(3, addressWithThreePeople.getPersonSet().size());
        Assertions.assertEquals(addressWithThreePeople.getBid(), personWithChangedAddress.getAddress().getBid());
        Assertions.assertEquals(2, activeAddresses);
    }


    private void addPeopleToAddress(Long addressId, Long... personId) {
        for (Long p : personId) {
            personService.addAddress(p, addressId);
        }
    }
}