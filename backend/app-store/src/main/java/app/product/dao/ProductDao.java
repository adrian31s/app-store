package app.product.dao;

import adi.jpa.crud.dao.BaseDao;
import app.product.model.Product;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@ApplicationScoped
@Slf4j
public class ProductDao extends BaseDao<Product> {

    public List<Product> getProductBySearchCriteria(Map<String, String> productFieldsValue, Map<String, String> productDetailsFieldsValue, String productDetails) {
        if (productDetailsFieldsValue.isEmpty() && productFieldsValue.isEmpty()) {
            return this.getAllEntities();
        }

        StringBuilder sb = new StringBuilder("SELECT p FROM Product p");

        if (productDetails != null) {
            sb.append("\nJOIN p.");
            sb.append(productDetails);
            sb.append(" x");
        }

        sb.append(" \nWHERE ");
        for (String field : productFieldsValue.keySet()) {
            sb.append("p.");
            sb.append(field);
            sb.append(productFieldsValue.get(field));
            sb.append(" \nAND ");
        }

        for (String field : productDetailsFieldsValue.keySet()) {
            sb.append("x.");
            sb.append(field);
            sb.append(" ");
            sb.append(productDetailsFieldsValue.get(field));
            sb.append(" \nAND ");
        }


        String stringQuery = sb.substring(0, sb.length() - 5);
        log.info("created SQL:{}", stringQuery);
        TypedQuery<Product> query = getEntityManager().createQuery(stringQuery, Product.class);
        return query.getResultList();
    }

    @Transactional
    public void deleteAll() {
        getEntityManager().createQuery("DELETE FROM Product").executeUpdate();
    }

    @Override
    public Class<Product> getClazz() {
        return Product.class;
    }
}
