package app.application.service;

import app.address.dao.AddressDao;
import app.address.factory.AddressFactory;
import app.address.model.Address;
import app.applicaiton.service.ApplicationService;
import app.base.BaseTest;
import app.bucket.service.BucketService;
import app.email.service.EmailService;
import app.order.model.Order;
import app.person.factory.PersonFactory;
import app.person.model.Person;
import app.person.service.PersonService;
import app.product.model.Product;
import app.product.model.utill.ProductCategory;
import app.product.service.ProductService;
import app.product.types.charger.model.Charger;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;
import io.quarkus.test.junit.QuarkusMock;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import javax.inject.Inject;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

@QuarkusTest
public class ApplicationServiceTest extends BaseTest {
    private final ApplicationService applicationService;
    private final BucketService bucketService;
    private final ProductService productService;
    private final PersonService personService;
    private final ProductOrderDao productOrderDao;
    private final AddressDao addressDao;


    @BeforeEach
    void setUp() {
        super.cleanUp();
    }

    @Inject
    public ApplicationServiceTest(ApplicationService applicationService, BucketService bucketService, ProductService productService, PersonService personService, ProductOrderDao productOrderDao, AddressDao addressDao) {
        this.applicationService = applicationService;
        this.bucketService = bucketService;
        this.productService = productService;
        this.personService = personService;
        this.productOrderDao = productOrderDao;
        this.addressDao = addressDao;
    }

    @Test
    void shouldCreateOrderWhenCreateOrder() {
        //given
        mockEmailService();
        Person person = PersonFactory.createRandomPerson();
        Address address = AddressFactory.createRandomAddress();
        address.setPersonSet(Set.of(person));
        addressDao.createEntity(address);

        Product product = new Product();
        product.setQuantity(100);
        product.setPrice(100d);
        product.setProductCategory(ProductCategory.CHARGER);
        Charger charger = new Charger();
        product.setCharger(charger);
        productDao.createEntity(product);

        bucketService.create(person.getBid());

        ProductOrder productOrder = new ProductOrder();
        productOrder.setProduct(product); //?
        productOrder.setQuantityProductOrder(10);
        productOrder.setBucket(bucketService.getActiveBucketByPersonId(person.getBid()));
        productOrderDao.createEntity(productOrder);

        //when
        applicationService.finalize(person.getBid(), address.getBid());

        //then
        List<Order> orderList = orderDao.getAllEntities();
        assertEquals(1, orderList.size());
        assertEquals(90, productDao.getById(product.getBid()).getQuantity());
    }


    @Test
    void shouldRollbackWhenCreateOrder() {
        //given
        mockEmailServiceWithException();
        Person person = PersonFactory.createRandomPerson();
        Address address = AddressFactory.createRandomAddress();
        address.setPersonSet(Set.of(person));
        addressDao.createEntity(address);

        Product product = new Product();
        product.setQuantity(100);
        product.setPrice(100d);
        product.setProductCategory(ProductCategory.CHARGER);
        Charger charger = new Charger();
        product.setCharger(charger);
        productDao.createEntity(product);

        bucketService.create(person.getBid());

        ProductOrder productOrder = new ProductOrder();
        productOrder.setProduct(product); //?
        productOrder.setQuantityProductOrder(10);
        productOrder.setBucket(bucketService.getActiveBucketByPersonId(person.getBid()));
        productOrderDao.createEntity(productOrder);

        //when
        assertThrows(RuntimeException.class, () -> applicationService.finalize(person.getBid(), address.getBid()));

        //then
        List<Order> orderList = orderDao.getAllEntities();
        assertEquals(0, orderList.size());
        assertEquals(100, productDao.getById(product.getBid()).getQuantity());
    }

    private void mockEmailService() {
        EmailService mock = Mockito.mock(EmailService.class);
        Mockito.doNothing().when(mock).sendEmailFinalizePurchase(any(), any());
        QuarkusMock.installMockForType(mock, EmailService.class);
    }


    private void mockEmailServiceWithException() {
        EmailService mock = Mockito.mock(EmailService.class);
        Mockito.doThrow(new RuntimeException("TEST")).when(mock).sendEmailFinalizePurchase(any(), any());
        QuarkusMock.installMockForType(mock, EmailService.class);
    }

}
