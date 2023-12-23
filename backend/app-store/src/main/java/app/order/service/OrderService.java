package app.order.service;


import app.bucket.dao.BucketDao;
import app.bucket.model.Bucket;
import app.bucket.service.BucketService;
import app.order.dao.OrderDao;
import app.order.model.Order;
import app.order.model.utill.Status;
import app.person.dao.PersonDao;
import app.person.model.Person;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
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

    @Transactional(Transactional.TxType.REQUIRED)
    public Order createOrder(Long personId) {
        Person person = persondao.getById(personId);
        if (person == null) return null;
        Bucket bucket = bucketDao.getActiveBucketByPersonId(personId);
        if (bucket == null) return null;
        bucket.setArchived(Boolean.TRUE);
        Order order = setupOrder(bucket);
        bucketService.create(personId);
        return order;
    }

    private Order setupOrder(Bucket bucket) {
        Order order = new Order();
        order.setBucket(bucket);
        order.setOrdered(new Date());
        order.setStatus(Status.IN_PROGRESS);
        return orderDao.createEntity(order);
    }
}
