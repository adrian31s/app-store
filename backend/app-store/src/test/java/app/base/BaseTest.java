package app.base;

import app.address.dao.AddressDao;
import app.bucket.dao.BucketDao;
import app.opinion.dao.OpinionDao;
import app.order.dao.OrderDao;
import app.person.dao.PersonDao;
import app.product.dao.ProductDao;
import app.product.types.charger.dao.ChargerDao;
import app.single_product_order.dao.ProductOrderDao;

import javax.inject.Inject;


public abstract class BaseTest {
    @Inject
    protected PersonDao personDao;
    @Inject
    protected AddressDao addressDao;
    @Inject
    protected BucketDao bucketDao;
    @Inject
    protected OrderDao orderDao;
    @Inject
    protected ProductDao productDao;
    @Inject
    protected ProductOrderDao productOrderDao;
    @Inject
    protected ChargerDao chargerDao;
    @Inject
    protected OpinionDao opinionDao;


    protected void cleanUp(){
        opinionDao.deleteAll();
        productOrderDao.deleteAll();
        productDao.deleteAll();
        chargerDao.deleteAll();
        orderDao.deleteAll();
        bucketDao.deleteAll();
        personDao.deleteAll();
        addressDao.deleteAll();
    }
}
