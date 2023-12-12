package app.product.service;

import app.product.dao.ProductDao;
import app.product.model.Product;
import app.product.model.ProductEnhancedSearchCriteria;
import app.product.model.ProductSearchCriteria;
import app.product.service.mapper.ProductMapper;
import app.product.service.mapper.ProductMapperImpl;
import app.product.types.charger.dao.ChargerDao;
import app.product.types.cooler.dao.CoolerDao;
import app.product.types.dram_memory.dao.DRAMMemoryDao;
import app.product.types.graphic_card.dao.GraphicCardDao;
import app.product.types.hard_drive.dao.HardDriveDao;
import app.product.types.motherboard.dao.MotherboardDao;
import app.product.types.pc_case.dao.PcCaseDao;
import app.product.types.processor.dao.ProcessorDao;
import app.s3.service.S3BucketHandler;
import io.netty.util.internal.StringUtil;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.*;

@ApplicationScoped
@Slf4j
public class ProductService {
    private final ProductDao productDao;
    private final S3BucketHandler s3BucketHandler;

    @Inject
    public ProductService(ProductDao productDao, S3BucketHandler s3BucketHandler) {
        this.productDao = productDao;
        this.s3BucketHandler = s3BucketHandler;
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Product createProduct(Product product) {
        ProductMapper productMapper = new ProductMapperImpl();
        List<Product> products = findProductsBySearchCriteria(productMapper.mapToSearchCriteria(product));
        if (!products.isEmpty())
            return products.get(0);

        String thumbnail = s3BucketHandler.putObject(product.getThumbnailAsByte(), UUID.randomUUID().toString());
        List<String> pictures = new ArrayList<>();

        if (product.getPicturesAsBytes() == null) {
            pictures.add("not-found");
        } else {
            String[] picturesAsBytes = product.getPicturesAsBytes().split(",");
            for (String pictureAsByte : picturesAsBytes) {
                pictures.add(s3BucketHandler.putObject(pictureAsByte, UUID.randomUUID().toString()));
            }
        }
        product.setThumbnail(thumbnail);
        product.setPictures(String.join(", ", pictures));
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

    @Transactional(Transactional.TxType.REQUIRED) // for post load
    public Product getProductById(Long id) {
        return productDao.getById(id);
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Product> getAllProducts() {
        return productDao.getAllEntities();
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Product> getProductsBySearchCriteria(ProductEnhancedSearchCriteria searchCriteria) {
        Map<String, String> productMainFieldPredicateMap = getProductMapFields(searchCriteria);
        Map<String, String> productDetailsFieldPredicateMap = getProductDetailMapFields(searchCriteria);
        return productDao.getProductBySearchCriteria(productMainFieldPredicateMap, productDetailsFieldPredicateMap, searchCriteria.productCategoryProperty());
    }

    private Map<String, String> getProductMapFields(ProductEnhancedSearchCriteria searchCriteria) {
        Map<String, String> productFieldPredicateMap = new HashMap<>();

        if (!StringUtil.isNullOrEmpty(searchCriteria.name())) {
            productFieldPredicateMap.put("name", buildSinglePredicate(searchCriteria.name()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.producer())) {
            productFieldPredicateMap.put("producer", buildSinglePredicate(searchCriteria.producer()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.guarantee())) {
            productFieldPredicateMap.put("guarantee", buildSinglePredicate(searchCriteria.guarantee()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.model())) {
            productFieldPredicateMap.put("model", buildSinglePredicate(searchCriteria.model()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.price())) {
            productFieldPredicateMap.put("price", buildSinglePredicate(searchCriteria.price()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.quantity())) {
            productFieldPredicateMap.put("quantity", buildSinglePredicate(searchCriteria.quantity()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.rate())) {
            productFieldPredicateMap.put("rate", buildSinglePredicate(searchCriteria.rate()));
        }

        return productFieldPredicateMap;
    }

    private Map<String, String> getProductDetailMapFields(ProductEnhancedSearchCriteria searchCriteria) {
        Map<String, String> productDetailsFieldPredicateMap = new HashMap<>();

        if (!StringUtil.isNullOrEmpty(searchCriteria.power())) {
            productDetailsFieldPredicateMap.put("power", buildSinglePredicate(searchCriteria.power()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.standard())) {
            productDetailsFieldPredicateMap.put("standard", buildSinglePredicate(searchCriteria.standard()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.coolingType())) {
            productDetailsFieldPredicateMap.put("coolingType", buildSinglePredicate(searchCriteria.coolingType()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.noise())) {
            productDetailsFieldPredicateMap.put("noise", buildSinglePredicate(searchCriteria.noise()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.width())) {
            productDetailsFieldPredicateMap.put("width", buildSinglePredicate(searchCriteria.width()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.height())) {
            productDetailsFieldPredicateMap.put("height", buildSinglePredicate(searchCriteria.height()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.depth())) {
            productDetailsFieldPredicateMap.put("depth", buildSinglePredicate(searchCriteria.depth()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.type())) {
            productDetailsFieldPredicateMap.put("type", buildSinglePredicate(searchCriteria.type()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.maxRotationSpeed())) {
            productDetailsFieldPredicateMap.put("maxRotationSpeed", buildSinglePredicate(searchCriteria.maxRotationSpeed()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.maxVolume())) {
            productDetailsFieldPredicateMap.put("maxVolume", buildSinglePredicate(searchCriteria.maxVolume()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.supplyVoltage())) {
            productDetailsFieldPredicateMap.put("supplyVoltage", buildSinglePredicate(searchCriteria.supplyVoltage()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.coolerType())) {
            productDetailsFieldPredicateMap.put("coolerType", buildSinglePredicate(searchCriteria.coolerType()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.latencyCycle())) {
            productDetailsFieldPredicateMap.put("latencyCycle", buildSinglePredicate(searchCriteria.latencyCycle()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.memoryType())) {
            productDetailsFieldPredicateMap.put("memoryType", buildSinglePredicate(searchCriteria.memoryType()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.frequency())) {
            productDetailsFieldPredicateMap.put("frequency", buildSinglePredicate(searchCriteria.frequency()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.memory())) {
            productDetailsFieldPredicateMap.put("memory", buildSinglePredicate(searchCriteria.memory()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.memoryChipset())) {
            productDetailsFieldPredicateMap.put("memoryChipset", buildSinglePredicate(searchCriteria.memoryChipset()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.connectorType())) {
            productDetailsFieldPredicateMap.put("connectorType", buildSinglePredicate(searchCriteria.connectorType()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.memoryClocking())) {
            productDetailsFieldPredicateMap.put("memoryClocking", buildSinglePredicate(searchCriteria.memoryClocking()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.memoryInterface())) {
            productDetailsFieldPredicateMap.put("memoryInterface", buildSinglePredicate(searchCriteria.memoryInterface()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.motherboardStandard())) {
            productDetailsFieldPredicateMap.put("motherboardStandard", buildSinglePredicate(searchCriteria.motherboardStandard()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.processorSocket())) {
            productDetailsFieldPredicateMap.put("processorSocket", buildSinglePredicate(searchCriteria.processorSocket()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.maxMemory())) {
            productDetailsFieldPredicateMap.put("maxMemory", buildSinglePredicate(searchCriteria.maxMemory()));
        }
        if (!StringUtil.isNullOrEmpty(searchCriteria.length())) {
            productDetailsFieldPredicateMap.put("length", buildSinglePredicate(searchCriteria.length()));
        }

        return productDetailsFieldPredicateMap;
    }


    private String buildSinglePredicate(String value) {
        String[] values = value.split(";");
        String predicate;
        switch (values[0]) {
            case "lessThan" -> predicate = " < " + values[1];
            case "betterThan" -> predicate = " > " + values[1];
            case "like" -> predicate = " LIKE '" + values[1] + "'";
            case "between" -> predicate = " BETWEEN " + values[1] + " AND " + values[2];
            case "in" -> predicate = " in ('" + value.substring(1).replaceAll(";", "','") + "')";
            default -> predicate = " = '" + value + "'";
        }
        return predicate;
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
