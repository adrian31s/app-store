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
import app.order.model.OrderDTO;
import app.order.service.OrderMapper;
import app.order.service.OrderMapperImpl;
import app.order.service.OrderService;
import app.person.model.Person;
import app.person.model.PersonDTO;
import app.person.model.utill.Role;
import app.person.service.PersonMapper;
import app.person.service.PersonMapperImpl;
import app.person.service.PersonService;
import app.product.model.Product;
import app.product.model.ProductDTO;
import app.product.service.ProductService;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

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
    @Path("/updatePersonAddressById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "updatePersonAddressById", description = "update person address by person id, if address not exists then create new one")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = PersonDTO.class)
            )
    )
    public Response updatePersonAddressById(@PathParam("id") Long personId, @RequestBody AddressSearchCriteria addressSearchCriteria) {
        List<Address> addresses = addressService.getByMultipleValues(addressSearchCriteria);
        Address address;
        if (!addresses.isEmpty()) {
            address = addresses.get(0);
        } else {
            AddressMapper addressMapper = new AddressMapperImpl();
            address = addressService.createAddress(addressMapper.toAddress(addressSearchCriteria));
        }

        Person person = personService.addAddress(personId, address.getBid());
        return Response.accepted(personMapper.mapToDTO(person)).build();
    }


    @POST
    @Path("/create/person")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "createPerson", description = "create new person")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = PersonDTO.class)
            )
    )
    public Response createPerson(@RequestBody Person person) {
        person.setRole(Role.USER);
        Long personId = personService.createPerson(person).getBid();
        bucketService.create(personId);
        Person createdPerson = personService.getById(personId);
        return Response.accepted(personMapper.mapToDTO(createdPerson)).build();
    }

    @POST
    @Path("/create/order")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "createOrder", description = "create new order")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = OrderDTO.class)
            )
    )
    public Response createOrder(@RequestBody Person person) {
        Order order = orderService.createOrder(person.getBid());
        return Response.accepted(orderMapper.mapToDTO(order)).build();
    }

    @POST
    @Path("/addProductToBucket")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "addProductToBucket", description = "add product to active bucket")
    @APIResponses({
            @APIResponse(
                    responseCode = "204",
                    description = "NO CONTENT"
            ),
            @APIResponse(
                    responseCode = "304",
                    description = "NOT MODIFIED"
            )
    })
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
            return Response.noContent().build();
        }
        return Response.notModified().build();
    }

    @POST
    @Path("/removeProductFromBucket")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "removeProductFromBucket", description = "remove product from bucket")
    @APIResponse(
            responseCode = "204",
            description = "NO CONTENT"
    )

    public Response removeProductFromBucket(@QueryParam("productId") Long productId,
                                            @QueryParam("personId") Long personId) {
        bucketService.removeProductFromBucket(personId, productId);
        return Response.noContent().build();
    }
}
