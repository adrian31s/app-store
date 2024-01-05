package app.order.service;


import app.address.model.Address;
import app.address.service.AddressService;
import app.bucket.dao.BucketDao;
import app.bucket.model.Bucket;
import app.bucket.service.BucketService;
import app.order.dao.OrderDao;
import app.order.model.Order;
import app.order.model.utill.Status;
import app.person.dao.PersonDao;
import app.person.model.Person;
import app.single_product_order.model.ProductOrder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Date;

@ApplicationScoped
public class OrderService {
    @Inject
    OrderDao orderDao;
    @Inject
    PersonDao persondao;
    @Inject
    BucketDao bucketDao;
    @Inject
    BucketService bucketService;
    @Inject
    AddressService addressService;

    @Transactional(Transactional.TxType.REQUIRED)
    public Order createOrder(Long personId, Long deliveryAddressId) {
        Person person = persondao.getById(personId);
        Address address = addressService.getById(deliveryAddressId);
        Bucket bucket = bucketDao.getActiveBucketByPersonId(personId);

        if (person == null || address==null || bucket == null) throw new RuntimeException("could not create Order");
        bucket.setArchived(Boolean.TRUE);
        Order order = setupOrder(bucket,address);
        bucketService.create(personId);
        return order;
    }

    private Order setupOrder(Bucket bucket, Address address) {
        Order order = new Order();
        order.setBucket(bucket);
        order.setOrdered(new Date());
        order.setStatus(Status.IN_PROGRESS);
        order.setDeliveryAddress(address);
        order.setTotalPrice(calculateTotalPrice(bucket.getProductOrders()));
        return orderDao.createEntity(order);
    }

    private Double calculateTotalPrice(Collection<ProductOrder> pos) {
        return pos.stream()
                .mapToDouble(po -> po.getProduct().getPrice())
                .sum();
    }
}
