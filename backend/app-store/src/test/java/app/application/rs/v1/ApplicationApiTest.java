package app.application.rs.v1;

import app.address.factory.AddressFactory;
import app.address.model.Address;
import app.base.BaseTest;
import app.bucket.model.Bucket;
import app.bucket.service.BucketService;
import app.order.model.Order;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import app.person.service.PersonService;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

import static io.restassured.RestAssured.given;

@QuarkusTest
public class ApplicationApiTest extends BaseTest {
    @Inject
    PersonService personService;
    @Inject
    BucketService bucketService;


    @BeforeEach
    public void setup() {
        cleanUp();
    }


    @Test
    public void shouldUpdatePersonAddressWhenUpdateAddress() {
        //given
        Person person = personService.createPerson(PersonFactory.createRandomPerson());
        Address address = AddressFactory.createRandomAddress();

        //when
        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(address)
                .when()
                .patch("store/updatePersonAddress/id/" + person.getBid())
                .then()
                .statusCode(200);

        //then
        Person updatedPerson = personDao.getById(person.getBid());
        Assertions.assertNotNull(updatedPerson.getAddresses());
    }

    @Test
    public void shouldCreatePersonWithEmptyBucketWhenCreatePerson() {
        //given
        Person person = PersonFactory.createRandomPerson();

        //when
        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(person)
                .when()
                .post("store/create/person")
                .then()
                .statusCode(200);

        //then
        Assertions.assertEquals(1, personDao.getAllEntities().size());
        Assertions.assertEquals(1, bucketDao.getAllEntities().size());

        Bucket bucket = bucketDao.getAllEntities().get(0);
        List<Bucket> personBuckets = new ArrayList<>(personDao.getAllEntities().get(0).getBuckets());
        Assertions.assertEquals(bucket.getBid(), personBuckets.get(0).getBid());
    }

    @Test
    public void shouldCreateOrderAndSetBucketAsArchivedWhenCreateOrder() {
        //given
        Person person = personDao.createEntity(PersonFactory.createRandomPerson());
        bucketService.create(person.getBid());

        //when
        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(person)
                .when()
                .post("store/create/order")
                .then()
                .statusCode(200);
        //then
        Person updatedPerson = personDao.getById(person.getBid());
        Order order = orderDao.getOrdersAssignedToPerson(person.getBid()).get(0);
        Bucket updatedBucket = order.getBucket();
        List<Bucket> personBuckets = new ArrayList<>(updatedPerson.getBuckets());
        Assertions.assertTrue(personBuckets.contains(updatedBucket));
        Assertions.assertEquals(2, personBuckets.size());
    }
}
