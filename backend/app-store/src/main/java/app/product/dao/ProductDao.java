package app.product.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.model.Product;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
public class ProductDao extends BaseDao<Product> {

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Product").executeUpdate();
    }

    @Override
    public Class<Product> getClazz() {
        return Product.class;
    }
}
