package app.order.dao;

import app.base.BaseTest;
import app.order.service.OrderService;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;

import javax.inject.Inject;

@QuarkusTest
public class OrderDaoTest extends BaseTest {
    @Inject
    OrderService orderService;

    @BeforeEach
    public void setup(){
        super.cleanUp();
    }

//    @Test
//    public void shouldReturnOrdersAssignedToPerson(){
//        //given
//        Person person = personDao.createEntity(PersonFactory.createRandomPerson());
//        Bucket bucket = new Bucket();
//        bucket.setPerson(person);
//        bucketDao.createEntity(bucket);
//        orderService.createOrder(person.getBid());
//
//        //when
//        List<Order> assignedOrders = orderDao.getOrdersAssignedToPerson(person.getBid());
//
//        //then
//        Assertions.assertEquals(1,assignedOrders.size());
//    }
}
