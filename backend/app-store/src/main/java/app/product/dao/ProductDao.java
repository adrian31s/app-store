package app.product.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.model.Product;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductDao extends BaseDao<Product> {
    @Override
    public Class<Product> getClazz() {
        return Product.class;
    }
}
