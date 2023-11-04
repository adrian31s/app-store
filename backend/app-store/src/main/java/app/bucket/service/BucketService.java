package app.bucket.service;

import app.bucket.dao.BucketDao;
import app.bucket.model.Bucket;
import app.person.dao.PersonDao;
import app.person.model.Person;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class BucketService {
    @Inject
    BucketDao bucketDao;
    @Inject
    PersonDao personDao;
    @Inject
    ProductOrderDao productOrderDao;

    public List<Bucket> getAll(){
        return bucketDao.getAllEntities();
    }

    public Bucket getById(Long id) {
        return bucketDao.getById(id);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Bucket create(Long personId){
        Person person = personDao.getById(personId);
        Bucket bucket = new Bucket();
        bucket.setPerson(person);
        return bucketDao.createEntity(bucket);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Bucket getActiveBucketByPersonId(Long personId){
        return bucketDao.getActiveBucketByPersonId(personId);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public int removeProductFromBucket(Long personId,Long productId){
        Long activeBucketId = bucketDao.getActiveBucketByPersonId(personId).getBid();
        return productOrderDao.deleteProductOrderById(activeBucketId,productId);
    }}
