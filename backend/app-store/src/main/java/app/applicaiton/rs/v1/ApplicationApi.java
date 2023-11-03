package app.applicaiton.rs.v1;

import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.model.AddressSearchCriteria;
import app.address.service.AddressService;
import app.bucket.model.Bucket;
import app.bucket.service.BucketService;
import app.order.service.OrderService;
import app.person.model.Person;
import app.person.service.PersonService;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

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
        return Response.ok(person).build();
    }


    @POST
    @Path("/create/person")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createPerson(@RequestBody Person person) {
        Long personId = personService.createPerson(person).getBid();
        bucketService.create(personId);
        return Response.ok(personService.getById(personId)).build();
    }

    @POST
    @Path("/create/order")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createOrder(@RequestBody Person person) {
        orderService.createOrder(person.getBid());
        return Response.ok().build();
    }
}
