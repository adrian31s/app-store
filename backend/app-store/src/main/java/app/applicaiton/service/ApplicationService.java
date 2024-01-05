package app.applicaiton.service;

import app.address.model.Address;
import app.address.service.AddressService;
import app.bucket.dao.BucketDao;
import app.bucket.model.Bucket;
import app.bucket.service.BucketService;
import app.email.service.EmailService;
import app.order.model.Order;
import app.order.service.OrderService;
import app.person.dao.PersonDao;
import app.person.model.Person;
import app.product.dao.ProductDao;
import app.product.model.Product;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class ApplicationService {
    private final BucketDao bucketDao;
    private final PersonDao personDao;
    private final ProductOrderDao productOrderDao;
    private final ProductDao productDao;
    private final OrderService orderService;
    private final BucketService bucketService;
    private final EmailService emailService;
    private final AddressService addressService;


    @Inject
    public ApplicationService(BucketDao bucketDao, PersonDao personDao, ProductOrderDao productOrderDao, ProductDao productDao, OrderService orderService, BucketService bucketService, EmailService emailService, AddressService addressService) {
        this.bucketDao = bucketDao;
        this.personDao = personDao;
        this.productOrderDao = productOrderDao;
        this.productDao = productDao;
        this.orderService = orderService;
        this.bucketService = bucketService;
        this.emailService = emailService;
        this.addressService = addressService;
    }

    @Transactional(value = Transactional.TxType.REQUIRED, rollbackOn = Exception.class)
    public void finalize(Long personId, Long deliveryAddressId) {
        Person person = personDao.getById(personId);
        Bucket bucket = bucketService.getActiveBucketByPersonId(personId);
        updateProductsQuantity(bucket.getProductOrders());
        Order order = orderService.createOrder(personId, deliveryAddressId);
        emailService.sendEmailFinalizePurchase(person.getEmail(), buildHTMLParams(bucket.getProductOrders(),order));
    }

    private HashMap<String,String> buildHTMLParams(Collection<ProductOrder> productOrders, Order order) {
        StringBuilder sb = new StringBuilder();
        HashMap<String,String> params = new HashMap<>();
        for (ProductOrder productOrder : productOrders) {
            sb
                    .append("<li>")
                    .append(productOrder.getProduct().getName())
                    .append(" X ")
                    .append(productOrder.getQuantityProductOrder())
                    .append("</li>\n");
        }
        params.put("products",sb.toString());
        params.put("orderId",order.getBid().toString());
        Address address = order.getDeliveryAddress();
        params.put("apartmentNumber",String.valueOf(address.getApartmentNumber()));
        params.put("buildingNumber",address.getBuildingNumber());
        params.put("province",address.getProvince());
        params.put("city",address.getStreetName());
        params.put("zipCode",address.getZipCode());
        params.put("price", String.valueOf(order.getTotalPrice()));
        return params;
    }

    private void updateProductsQuantity(Collection<ProductOrder> productOrders) {
        List<Product> productsToUpdate = new ArrayList<>();
        for (ProductOrder po : productOrders) {
            Product product = po.getProduct();
            int quantity = product.getQuantity() - po.getQuantityProductOrder();
            if (quantity < 0) {
                throw new RuntimeException("product order quantity bigger than product quantity");
            }
            product.setQuantity(quantity);
            productsToUpdate.add(product);
        }

        productsToUpdate.forEach(productDao::updateEntity);
    }

}
