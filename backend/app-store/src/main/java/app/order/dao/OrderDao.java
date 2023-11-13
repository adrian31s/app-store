package app.order.dao;

import adi.jpa.crud.dao.BaseDao;
import app.bucket.model.Bucket;
import app.bucket.model.Bucket_;
import app.order.model.Order;
import app.order.model.Order_;
import app.person.model.Person;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class OrderDao extends BaseDao<Order> {
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Order> getOrdersAssignedToPerson(Long personId){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Order> cq = cb.createQuery(Order.class);
        Root<Order> orderRoot = cq.from(Order.class);
        Root<Bucket> bucketRoot = cq.from(Bucket.class);
        Join<Order, Bucket> order = orderRoot.join(Order_.BUCKET);
        Join<Person,Order> bucket = bucketRoot.join(Bucket_.PERSON);
        cq.select(orderRoot).where(cb.and(
                cb.equal(bucketRoot.get(Bucket_.PERSON),personId),
                cb.equal(bucketRoot.get(Bucket_.ARCHIVED),Boolean.TRUE)
        ));
        return getEntityManager().createQuery(cq).getResultList();
    }


    @Override
    public Class<Order> getClazz() {
        return Order.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Order").executeUpdate();
    }
}
