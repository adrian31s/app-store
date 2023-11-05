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

    Long addressId;
    Long address1Id;
    Long address2Id;


    @BeforeEach
    public void setup() {
        personId = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();
        person1Id = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();
        person2Id = personDao.createEntity(PersonFactory.createRandomPerson()).getBid();

        addressId = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();
        address1Id = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();
        address2Id = addressDao.createEntity(AddressFactory.createRandomAddress()).getBid();

        addPeopleToAddress(addressId, personId);
        addPeopleToAddress(address1Id, personId, person1Id, person2Id);
        addPeopleToAddress(address2Id, person2Id);
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
        Assertions.assertEquals(3, personDao.getAllEntities().size());
    }

    @Test
    public void shouldAllAddressesSetCorrectlyWhenAddAddress() {
        //then
        int address = addressDao.getById(addressId).getPersonSet().size();
        int address1 = addressDao.getById(address1Id). getPersonSet().size();
        int address2 = addressDao.getById(address2Id).getPersonSet().size();

        Assertions.assertEquals(1,address);
        Assertions.assertEquals(3,address1);
        Assertions.assertEquals(1,address2);
    }

    @Test
    public void shouldRemovePersonAddressesWhenRemoveAddress() {
        //when
        personService.removeAddress(personId,addressId);

        //then
        Address address = addressDao.getById(addressId);
        Person person = personDao.getById(personId);

        Assertions.assertEquals(1,person.getAddresses().size());
        Assertions.assertEquals(0,address.getPersonSet().size());
    }


    private void addPeopleToAddress(Long addressId, Long... personId) {
        for (Long p : personId) {
            personService.addAddress(p, addressId);
        }
    }
}