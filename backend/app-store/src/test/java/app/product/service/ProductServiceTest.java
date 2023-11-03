package app.product.service;

import app.base.BaseTest;
import app.product.model.Product;
import app.product.model.ProductSearchCriteria;
import app.product.model.utill.ProductCategory;
import app.product.types.charger.dao.ChargerDao;
import app.product.types.charger.model.Charger;
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
}
