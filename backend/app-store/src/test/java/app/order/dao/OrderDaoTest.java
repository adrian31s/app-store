package app.order.dao;

import app.base.BaseTest;
import app.bucket.model.Bucket;
import app.order.model.Order;
import app.order.service.OrderService;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.util.List;

@QuarkusTest
public class OrderDaoTest extends BaseTest {
    @Inject
    OrderService orderService;
    @BeforeEach
    public void cleanUp(){
        super.cleanUp();
    }

    @Test
    public void shouldReturnOrdersAssignedToPerson(){
        //given
        Person person = personDao.createEntity(PersonFactory.createRandomPerson());
        Bucket bucket = new Bucket();
        bucket.setPerson(person);
        bucketDao.createEntity(bucket);
        orderService.createOrder(person.getBid());

        //when
        List<Order> assignedOrders = orderDao.getOrdersAssignedToPerson(person.getBid());

        //then
        Assertions.assertEquals(1,assignedOrders.size());
    }
}
