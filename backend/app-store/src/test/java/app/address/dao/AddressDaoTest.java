package app.address.dao;

import app.address.factory.AddressFactory;
import app.address.model.Address;
import app.base.BaseTest;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
class AddressDaoTest extends BaseTest {
    private final AddressDao addressDao;
    @Inject
    AddressDaoTest(AddressDao addressDao) {
        this.addressDao = addressDao;
    }

    @BeforeEach
    void setUp(){
        cleanUp();
    }

    @Test
    void shouldGetAddressesAssignedToPersonWhenGetAddressByPersonId(){
        //given
        Person person =PersonFactory.createRandomPerson();
        Address address = AddressFactory.createRandomAddress();
        address.setPersonSet(Set.of(person));
        person.setAddresses(Set.of(address));
        addressDao.createEntity(address);

        //when
        List<Address> addressList = addressDao.getAddressByPersonId(person.getBid());

        //then
        assertEquals(1,addressList.size());
    }
}
