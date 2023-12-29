package app.bucket.dao;

import adi.jpa.crud.dao.BaseDao;
import app.bucket.model.Bucket;
import app.bucket.model.Bucket_;
import app.person.model.Person;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

@ApplicationScoped
public class BucketDao extends BaseDao<Bucket> {

    @Transactional(Transactional.TxType.SUPPORTS)
    public Bucket getActiveBucketByPersonId(Long personId) {
        try {
            CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
            CriteriaQuery<Bucket> cq = cb.createQuery(Bucket.class);
            Root<Bucket> root = cq.from(Bucket.class);
            Join<Bucket, Person> bucket = root.join(Bucket_.PERSON);
            cq.select(root).where(cb.and(
                    cb.equal(root.get(Bucket_.PERSON), personId),
                    cb.isNull(root.get(Bucket_.ARCHIVED))));
            return getEntityManager().createQuery(cq).getSingleResult();
        } catch (NoResultException nre) {
            return null;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public int updateProductQuantity(Long productId, Long personId, int newQuantity) {
        String query = """
                update productorder po
                set quantity_product_order = ?1
                where bid = (select po1.bid
                			   from productorder po1
                			   join bucket b on po1.bucket_id=b.bid
                			   where b.archived is not true and b.person_id = ?2 and po1.product_id = ?3 )
                """;
        return getEntityManager().createNativeQuery(query)
                .setParameter(2, personId)
                .setParameter(3, productId)
                .setParameter(1, newQuantity)
                .executeUpdate();
    }

    @Override
    public Class<Bucket> getClazz() {
        return Bucket.class;
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Bucket").executeUpdate();
    }
}
