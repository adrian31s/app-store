package app.product.service;

import app.product.dao.ProductDao;
import app.product.model.Product;
import app.product.model.ProductSearchCriteria;
import app.product.service.mapper.ProductMapper;
import app.product.service.mapper.ProductMapperImpl;
import app.product.types.charger.dao.ChargerDao;
import app.product.types.charger.model.Charger;
import app.product.types.charger.service.ChargerMapper;
import app.product.types.charger.service.ChargerMapperImpl;
import app.product.types.cooler.dao.CoolerDao;
import app.product.types.dram_memory.dao.DRAMMemoryDao;
import app.product.types.graphic_card.dao.GraphicCardDao;
import app.product.types.hard_drive.dao.HardDriveDao;
import app.product.types.motherboard.dao.MotherboardDao;
import app.product.types.pc_case.dao.PcCaseDao;
import app.product.types.processor.dao.ProcessorDao;
import io.netty.util.internal.StringUtil;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class ProductService {
    @Inject
    ProductDao productDao;
    @Inject
    ChargerDao chargerDao;
    @Inject
    CoolerDao coolerDao;
    @Inject
    DRAMMemoryDao dramMemoryDao;
    @Inject
    GraphicCardDao graphicCardDao;
    @Inject
    HardDriveDao hardDriveDao;
    @Inject
    MotherboardDao motherboardDao;
    @Inject
    PcCaseDao pcCaseDao;
    @Inject
    ProcessorDao processorDao;

    @Transactional(Transactional.TxType.REQUIRED)
    public Product createProduct(Product product) {
        ProductMapper productMapper = new ProductMapperImpl();
        List<Product> products = findProductsBySearchCriteria(productMapper.mapToSearchCriteria(product));
        if (!products.isEmpty()) {
            Product product1 = products.get(0);
            product1.setQuantity(product.getQuantity());
            return productDao.updateEntity(product1);
        }
        return productDao.createEntity(product);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public int updateProductById(Long id, ProductSearchCriteria searchCriteria) {
        Product product = productDao.getById(id);
        if (product == null) return 0;
        return productDao.updateEntitiesFieldsById(id, getPredicates(searchCriteria));
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Product updateProductWithDetailsById(Product product) {
        if (product == null) return null;
        return productDao.updateEntity(product);
    }


    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Product> findProductsBySearchCriteria(ProductSearchCriteria searchCriteria) {
        return productDao.getEntitiesByMultipleFields(getPredicates(searchCriteria));
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public Product getProductById(Long id) {
        return productDao.getById(id);
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Product> getAllProducts() {
        return productDao.getAllEntities();
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
