package app.applicaiton.rs.v1;

import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.model.AddressSearchCriteria;
import app.address.service.AddressService;
import app.bucket.model.Bucket;
import app.bucket.service.BucketMapper;
import app.bucket.service.BucketMapperImpl;
import app.bucket.service.BucketService;
import app.order.model.Order;
import app.order.service.OrderMapper;
import app.order.service.OrderMapperImpl;
import app.order.service.OrderService;
import app.person.model.Person;
import app.person.model.utill.Role;
import app.person.service.PersonMapper;
import app.person.service.PersonMapperImpl;
import app.person.service.PersonService;
import app.product.model.Product;
import app.product.service.ProductService;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("store")
public class ApplicationApi {
    @Inject
    AddressService addressService;
    @Inject
    PersonService personService;
    @Inject
    BucketService bucketService;
    @Inject
    OrderService orderService;
    @Inject
    ProductService productService;
    @Inject
    ProductOrderDao productOrderDao;

    private final PersonMapper personMapper = new PersonMapperImpl();
    private final OrderMapper orderMapper = new OrderMapperImpl();

    @PATCH
    @Path("/updatePersonAddress/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePersonAddress(@PathParam("id") Long personId, @RequestBody AddressSearchCriteria addressSearchCriteria) {
        List<Address> addresses = addressService.getByMultipleValues(addressSearchCriteria);
        Address address;
        if (!addresses.isEmpty()) {
            address = addresses.get(0);
        } else {
            AddressMapper addressMapper = new AddressMapperImpl();
            address = addressService.createAddress(addressMapper.toAddress(addressSearchCriteria));
        }

        Person person = personService.addAddress(personId, address.getBid());
        return Response.ok(personMapper.mapToDTO(person)).build();
    }


    @POST
    @Path("/create/person")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createPerson(@RequestBody Person person) {
        person.setRole(Role.USER);
        Long personId = personService.createPerson(person).getBid();
        bucketService.create(personId);
        Person createdPerson = personService.getById(personId);
        return Response.ok(personMapper.mapToDTO(createdPerson)).build();
    }

    @POST
    @Path("/create/order")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createOrder(@RequestBody Person person) {
        Order order = orderService.createOrder(person.getBid());
        return Response.ok(orderMapper.mapToDTO(order)).build();
    }

    @POST
    @Path("/addProductToBucket")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProductToBucket(@QueryParam("productId") Long productId,
                                       @QueryParam("quantity") int quantity,
                                       @QueryParam("personId") Long personId) {
        Product product = productService.getProductById(productId);
        Bucket bucket = bucketService.getActiveBucketByPersonId(personId);
        if (product != null && bucket != null) {
            ProductOrder productOrder = new ProductOrder();
            productOrder.setProduct(product);
            productOrder.setQuantityProductOrder(quantity);
            productOrder.setBucket(bucket);
            productOrderDao.createEntity(productOrder);
            return Response.ok().build();
        }
        return Response.notModified().build();
    }

    @POST
    @Path("/removeProductFromBucket")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeProductFromBucket(@QueryParam("productId") Long productId,
                                            @QueryParam("personId") Long personId) {
        bucketService.removeProductFromBucket(personId, productId);
        return Response.noContent().build();
    }

}
