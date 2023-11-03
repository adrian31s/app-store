package app.product.service;

import app.product.dao.ProductDao;
import app.product.model.Product;
import app.product.model.ProductSearchCriteria;
import app.product.types.charger.dao.ChargerDao;
import io.netty.util.internal.StringUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class ProductService {
    @Inject
    ProductDao productDao;
    @Inject
    ChargerDao chargerDao;

    @Transactional(Transactional.TxType.REQUIRED)
    public Product createProduct(Product product) {
        return productDao.createEntity(product);
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Product> findProductsBySearchCriteria(ProductSearchCriteria searchCriteria) {
        return productDao.getEntitiesByMultipleFields(getPredicates(searchCriteria));
    }

    public HashMap<String, Object> getPredicates(ProductSearchCriteria searchCriteria) {
        HashMap<String, Object> predicates = new HashMap<>();

        if (searchCriteria.getProductCategory() != null) {
            predicates.put("productCategory", searchCriteria.getProductCategory());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getName()) && !searchCriteria.getName().isBlank()) {
            predicates.put("name", searchCriteria.getName());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getProducer()) && !searchCriteria.getProducer().isBlank()) {
            predicates.put("producer", searchCriteria.getProducer());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getGuarantee()) && !searchCriteria.getGuarantee().isBlank()) {
            predicates.put("guarantee", searchCriteria.getGuarantee());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getModel()) && !searchCriteria.getModel().isBlank()) {
            predicates.put("model", searchCriteria.getModel());
        }

        if (!StringUtil.isNullOrEmpty(searchCriteria.getPrice()) && !searchCriteria.getPrice().isBlank()) {
            predicates.put("price", searchCriteria.getPrice());
        }

        return predicates;
    }

}
