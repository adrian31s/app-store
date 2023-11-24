package app.product.service;

import app.base.BaseTest;
import app.product.model.Product;
import app.product.model.ProductSearchCriteria;
import app.product.model.utill.ProductCategory;
import app.product.types.charger.dao.ChargerDao;
import app.product.types.charger.model.Charger;
import app.product.types.cooler.dao.CoolerDao;
import app.product.types.cooler.model.Cooler;
import app.product.types.dram_memory.dao.DRAMMemoryDao;
import app.product.types.dram_memory.model.DRAMMemory;
import app.product.types.graphic_card.dao.GraphicCardDao;
import app.product.types.graphic_card.model.GraphicCard;
import app.product.types.hard_drive.dao.HardDriveDao;
import app.product.types.hard_drive.model.HardDrive;
import app.product.types.motherboard.dao.MotherboardDao;
import app.product.types.motherboard.model.Motherboard;
import app.product.types.pc_case.dao.PcCaseDao;
import app.product.types.pc_case.model.PcCase;
import app.product.types.processor.dao.ProcessorDao;
import app.product.types.processor.model.Processor;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.util.List;

@QuarkusTest
public class ProductServiceTest extends BaseTest {
    @Inject
    ProductService productService;
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

    @BeforeEach
    public void setup(){
        super.cleanUp();
    }


    @Test
    public void shouldCreateChargerWhenCreateProduct(){
        //given
        Product product = new Product();
        product.setCharger(new Charger());
        product.setProductCategory(ProductCategory.CHARGER);

        //when
        Product updatedProduct = productService.createProduct(product);

        //then
        List<Charger> charger = chargerDao.getAllEntities();
        Assertions.assertEquals(1,charger.size());
        Assertions.assertEquals(updatedProduct.getBid(),charger.get(0).getProduct().getBid());
    }

    @Test
    public void shouldFindChargerByProductCategory(){
        //given
        Product product = new Product();
        product.setCharger(new Charger());
        product.setProductCategory(ProductCategory.CHARGER);
        productService.createProduct(product);

        //when
        List<Product> updatedProduct = productService.findProductsBySearchCriteria(ProductSearchCriteria.builder().productCategory(ProductCategory.CHARGER).build());


        //then
        Assertions.assertEquals(1,updatedProduct.size());
        Assertions.assertNotNull(updatedProduct.get(0).getCharger());
    }

    @Test
    public void shouldCreateAllProductTypesWhenCreateProduct(){
        //when
        createProducts();
        
        //then
        List<Product> allProducts = productService.getAllProducts();
        Assertions.assertEquals(8,allProducts.size());
    }

    private void createProducts(){
        Product product = new Product();
        product.setProductCategory(ProductCategory.CHARGER);
        product.setCharger(new Charger());
        productService.createProduct(product);

        Product product1 = new Product();
        product1.setProductCategory(ProductCategory.COOLER);
        product1.setCooler(new Cooler());
        productService.createProduct(product1);

        Product product2 = new Product();
        product2.setProductCategory(ProductCategory.DRAM_MEMORY);
        product2.setDramMemory(new DRAMMemory());
        productService.createProduct(product2);

        Product product3 = new Product();
        product3.setProductCategory(ProductCategory.GRAPHIC_CARD);
        product3.setGraphicCard(new GraphicCard());
        productService.createProduct(product3);

        Product product4 = new Product();
        product4.setProductCategory(ProductCategory.HARD_DRIVE);
        product4.setHardDrive(new HardDrive());
        productService.createProduct(product4);

        Product product5 = new Product();
        product5.setProductCategory(ProductCategory.MOTHERBOARD);
        product5.setMotherboard(new Motherboard());
        productService.createProduct(product5);

        Product product6 = new Product();
        product6.setProductCategory(ProductCategory.PC_CASE);
        product6.setPcCase(new PcCase());
        productService.createProduct(product6);

        Product product7 = new Product();
        product7.setProductCategory(ProductCategory.PROCESSOR);
        product7.setProcessor(new Processor());
        productService.createProduct(product7);
    }
}
