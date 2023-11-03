package app.base;

import app.address.dao.AddressDao;
import app.bucket.dao.BucketDao;
import app.order.dao.OrderDao;
import app.person.dao.PersonDao;
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


    protected void cleanUp(){
        orderDao.deleteAll();
        bucketDao.deleteAll();
        personDao.deleteAll();
        addressDao.deleteAll();
    }
}
