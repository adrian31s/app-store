package app.single_product_order.dao;

import adi.jpa.crud.dao.BaseDao;
import app.single_product_order.model.ProductOrder;
import app.single_product_order.model.ProductOrder_;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

@ApplicationScoped
public class ProductOrderDao extends BaseDao<ProductOrder> {

    @Transactional(Transactional.TxType.REQUIRED)
    public int deleteProductOrderById(Long bucketId, Long productId){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaDelete<ProductOrder> cd = cb.createCriteriaDelete(ProductOrder.class);
        Root<ProductOrder> root = cd.from(ProductOrder.class);
        cd.where(cb.and(
                cb.equal(root.get(ProductOrder_.BUCKET),bucketId),
                cb.equal(root.get(ProductOrder_.PRODUCT),productId)
        ));
        return getEntityManager().createQuery(cd).executeUpdate();
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM ProductOrder").executeUpdate();
    }

    @Override
    public Class<ProductOrder> getClazz() {
        return ProductOrder.class;
    }
}
