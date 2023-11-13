package app.address.rs.v1;

import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.model.AddressSearchCriteria;
import app.address.service.AddressService;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("address")
public class AddressApi {
    @Inject
    AddressService service;

    private final AddressMapper addressMapper = new AddressMapperImpl();
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List<Address> addresses = service.getAll();
        return Response.ok(addressMapper.mapToListDTO(addresses)).build();
    }

    @GET
    @Path("/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAddress(@PathParam("id") Long id) {
        Address address = service.getById(id);
        return Response.ok(addressMapper.mapToDTO(address)).build();
    }

    @PATCH
    @Path("/update/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateById(@PathParam("id") Long id, @RequestBody AddressSearchCriteria searchCriteria) {
        int affectedRecords = service.updateById(id, searchCriteria);
        if (affectedRecords == 0) {
            return Response.accepted().build();
        }
        return Response.ok(affectedRecords).build();
    }
}
