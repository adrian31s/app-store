package app.person.rs.v1;

import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.service.AddressService;
import app.person.model.Person;
import app.person.model.PersonSearchCriteria;
import app.person.service.PersonService;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("person")
public class PersonApi {
    @Inject
    PersonService service;
    @Inject
    AddressService addressService;


    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(service.getAll()).build();
    }

    @GET
    @Path("/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAddress(@PathParam("id") Long id) {
        return Response.ok(service.getById(id)).build();
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(@RequestBody Person person) {
        return Response.ok(service.createPerson(person)).build();
    }

    @PATCH
    @Path("/update/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateById(@PathParam("id") Long id, @RequestBody PersonSearchCriteria searchCriteria) {
        int affectedRecords = service.updateById(id, searchCriteria);
        if (affectedRecords == 0) {
            return Response.accepted().build();
        }
        return Response.ok(affectedRecords).build();
    }

    @PATCH
    @Path("/updateAddress/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAddressById(@PathParam("id") Long personId, @RequestBody Address address) {
        AddressMapper addressMapper = new AddressMapperImpl();
        List<Address> addresses = addressService.getByMultipleValues(addressMapper.toSearchCriteria(address));
        if (!addresses.isEmpty()) {
            address = addresses.get(0);
        } else {
            address = addressService.createAddress(address);
        }

        Person person = service.addAddress(personId, address.getBid());
        return Response.ok(person).build();
    }
}
