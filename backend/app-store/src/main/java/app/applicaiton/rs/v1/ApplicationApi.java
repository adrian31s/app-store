package app.applicaiton.rs.v1;

import adi.jpa.crud.exception.BaseDaoException;
import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.model.AddressDTO;
import app.address.service.AddressService;
import app.applicaiton.service.ApplicationService;
import app.bucket.model.Bucket;
import app.bucket.model.BucketDTO;
import app.bucket.service.BucketMapper;
import app.bucket.service.BucketMapperImpl;
import app.bucket.service.BucketService;
import app.email.service.EmailService;
import app.opinion.service.OpinionService;
import app.order.service.OrderMapper;
import app.order.service.OrderMapperImpl;
import app.order.service.OrderService;
import app.person.model.Person;
import app.person.model.PersonDTO;
import app.person.model.PersonSearchCriteria;
import app.person.model.utill.Role;
import app.person.service.PersonMapper;
import app.person.service.PersonMapperImpl;
import app.person.service.PersonService;
import app.product.model.Product;
import app.product.service.ProductService;
import app.security.authorization.TokenUtils;
import app.single_product_order.dao.ProductOrderDao;
import app.single_product_order.model.ProductOrder;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.UUID;

@Path("store")
@Slf4j
public class ApplicationApi {
    private final AddressService addressService;
    private final PersonService personService;
    private final BucketService bucketService;
    private final OrderService orderService;
    private final ProductService productService;
    private final ProductOrderDao productOrderDao;
    private final PersonMapper personMapper;
    private final OrderMapper orderMapper;
    private final BucketMapper bucketMapper;

    private final OpinionService opinionService;
    private final EmailService emailService;
    private final ApplicationService applicationService;

    @Inject
    public ApplicationApi(AddressService addressService, PersonService personService, BucketService bucketService, OrderService orderService, ProductService productService, ProductOrderDao productOrderDao, OpinionService opinionService, EmailService emailService, ApplicationService applicationService) {
        this.addressService = addressService;
        this.personService = personService;
        this.bucketService = bucketService;
        this.orderService = orderService;
        this.productService = productService;
        this.productOrderDao = productOrderDao;
        this.applicationService = applicationService;
        this.bucketMapper = new BucketMapperImpl();
        this.opinionService = opinionService;
        this.emailService = emailService;
        this.personMapper = new PersonMapperImpl();
        this.orderMapper = new OrderMapperImpl();
    }

    @RolesAllowed(value = "USER")
    @PUT
    @Path("/updatePersonAddress")
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
    public Response updatePersonAddressById(@HeaderParam("Authorization") String token, @RequestBody Address addres) {
        log.info("updatePersonAddressById");
        AddressMapper addressMapper = new AddressMapperImpl();

        List<Address> addresses = addressService.getByMultipleValues(addressMapper.toSearchCriteria(addres));
        if (!addresses.isEmpty()) {
            addres = addresses.get(0);
        } else {
            addres = addressService.createAddress(addres);
        }

        Person person = personService.addAddress(TokenUtils.encodeToken(token), addres.getBid());
        return Response.accepted(personMapper.mapToDTO(person)).build();
    }

    @RolesAllowed(value = "USER")
    @GET
    @Path("/getPersonAddresses")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getPersonAddresses", description = "get person addresses")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = AddressDTO[].class)
            )
    )
    public Response getPersonAddresses(@HeaderParam("Authorization") String token) {
        AddressMapper addressMapper = new AddressMapperImpl();
        List<Address> addresses = addressService.getAddressesByPersonId(TokenUtils.encodeToken(token));
        return Response.ok(addressMapper.mapToListDTO(addresses)).build();
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
        Long personId;
        try {
            personId = personService.createPerson(person).getBid();
        } catch (BaseDaoException cve) { //workaround
            if (cve.getCause().getMessage().contains("ConstraintViolationException")) {
                return Response.status(Response.Status.BAD_REQUEST).entity("username and email must be unique").build();
            }
            return Response.status(Response.Status.BAD_REQUEST).entity(cve.getCause()).build();
        }
        bucketService.create(personId);
        Person createdPerson = personService.getById(personId);
        return Response.accepted(personMapper.mapToDTO(createdPerson)).build();
    }


//    @POST
//    @RolesAllowed(value = "USER")
//    @Path("/create/order")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    @Operation(operationId = "createOrder", description = "create new order")
//    @APIResponse(
//            responseCode = "202",
//            description = "ACCEPTED",
//            content = @Content(
//                    mediaType = MediaType.APPLICATION_JSON,
//                    schema = @Schema(type = SchemaType.OBJECT, implementation = OrderDTO.class)
//            )
//    )
//    public Response createOrder(@HeaderParam("Authorization") String token) {
//        Order order = orderService.createOrder(TokenUtils.encodeToken(token));
//        return Response.accepted(orderMapper.mapToDTO(order)).build();
//    }

    @POST
    @RolesAllowed(value = "USER")
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
                                       @HeaderParam("Authorization") String token) {
        int affectedRows = bucketService.updateProductQuantity(TokenUtils.encodeToken(token), productId, quantity);
        if (affectedRows != 0) {
            return Response.noContent().build();
        }

        Product product = productService.getProductById(productId);
        Bucket bucket = bucketService.getActiveBucketByPersonId(TokenUtils.encodeToken(token));
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

    @RolesAllowed(value = "USER")
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
                                            @HeaderParam("Authorization") String token) {
        bucketService.removeProductFromBucket(TokenUtils.encodeToken(token), productId);
        return Response.noContent().build();
    }

    @RolesAllowed(value = "USER")
    @POST
    @Path("/addOpinion")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "addOpinion", description = "add opinion to product")
    @APIResponse(
            responseCode = "204",
            description = "NO CONTENT"
    )

    public Response addOpinion(@QueryParam("productId") Long productId,
                               @QueryParam("rate") Float rate,
                               @QueryParam("opinion") String opinion,
                               @HeaderParam("Authorization") String token) {
        String username = personService.getById(TokenUtils.encodeToken(token)).getUsername();
        Product product = productService.getProductById(productId);
        opinionService.addOpinion(username, product, rate, opinion);
        return Response.noContent().build();
    }

    @RolesAllowed(value = "USER")
    @POST
    @Path("/removeOpinion")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "removeOpinion", description = "remove opinion from product")
    @APIResponse(
            responseCode = "204",
            description = "NO CONTENT"
    )

    public Response removeOpinion(@QueryParam("opinionId") Long opinionId,
                                  @HeaderParam("Authorization") String token) {
        String username = personService.getById(TokenUtils.encodeToken(token)).getUsername();
        opinionService.removeOpinion(username, opinionId);
        return Response.noContent().build();
    }

    @PATCH
    @Path("/forgotPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(operationId = "forgotPassword", description = "send email to forgotten password account")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = PersonDTO.class)
            )
    )
    public Response genNewPassword(@QueryParam("email") String email) {
        List<Person> personList = personService.findBySearchCriteria(PersonSearchCriteria.builder().email(email).build());
        if (personList.size() != 1) {
            return Response.noContent().build();
        }
        Person person = personList.get(0);
        PersonSearchCriteria psc = PersonSearchCriteria.builder().password(UUID.randomUUID().toString()).build();
        personService.updateById(person.getBid(), psc);
        emailService.sendEmailForgotPassword(psc.getPassword(), person.getEmail());
        return Response.ok().build();
    }

    @RolesAllowed(value = "USER")
    @GET
    @Path("/getActiveBucket")
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getActiveBucket", description = "get active bucket")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = BucketDTO.class)
            )
    )
    public Response getActiveBucket(@HeaderParam("Authorization") String token) {
        Bucket bucket = bucketService.getActiveBucketByPersonId(TokenUtils.encodeToken(token));
        return Response.ok(bucketMapper.mapToDTO(bucket)).build();
    }

    @RolesAllowed(value = "USER")
    @GET
    @Path("/finalizeBuying")
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(operationId = "finalizeBuying", description = "finalize buying, set bucket as archived, send message to email")
    @APIResponse(
            responseCode = "204",
            description = "NO CONTENT"
    )
    public Response finalizeBuying(@HeaderParam("Authorization") String token, @QueryParam("deliveryAddressId") Long deliveryAddressId) {
        applicationService.finalize(TokenUtils.encodeToken(token), deliveryAddressId);
        return Response.noContent().build();
    }


}
