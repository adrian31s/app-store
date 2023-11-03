package app.person.rs.v1;

import app.address.dao.AddressDao;
import app.address.factory.AddressFactory;
import app.address.model.Address;
import app.address.service.AddressService;
import app.person.dao.PersonDao;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import app.person.service.PersonService;
import io.quarkus.test.junit.QuarkusTest;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;

import java.util.List;

import static io.restassured.RestAssured.given;

@QuarkusTest
@Slf4j
public class PersonApiTest {
    @Inject
    AddressDao addressDao;
    @Inject
    PersonDao personDao;
    @Inject
    PersonService personService;
    @Inject
    AddressService addressService;

    @BeforeEach
    public void setup() {
        personDao.deleteAll();
        addressDao.deleteAll();
    }



}
