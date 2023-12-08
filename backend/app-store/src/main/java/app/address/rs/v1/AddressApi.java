package app.address.rs.v1;

import app.address.mapper.AddressMapper;
import app.address.mapper.AddressMapperImpl;
import app.address.model.Address;
import app.address.model.AddressDTO;
import app.address.model.AddressSearchCriteria;
import app.address.service.AddressService;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.RolesAllowed;
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

    @RolesAllowed(value = {"ADMIN"})
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getAllAddresses", description = "get all addresses")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = AddressDTO.class)
            )
    )
    public Response getAllAddresses() {
        List<Address> addresses = service.getAll();
        return Response.ok(addressMapper.mapToListDTO(addresses)).build();
    }

    @RolesAllowed(value = {"ADMIN"})
    @GET
    @Path("getAddressById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getAddressById", description = "get address by id")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = AddressDTO.class)
            )
    )
    public Response getAddressById(@PathParam("id") Long id) {
        Address address = service.getById(id);
        return Response.ok(addressMapper.mapToDTO(address)).build();
    }

    @RolesAllowed(value = {"USER", "ADMIN"})
    @PATCH
    @Path("/updateAddressById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Operation(operationId = "updateAddressById", description = "update address by id")
    @APIResponse(
            responseCode = "204",
            description = "NO CONTENT"
    )
    public Response updateAddressById(@PathParam("id") Long id, @RequestBody Address address) {
        AddressSearchCriteria addressSearchCriteria = addressMapper.toSearchCriteria(address);
        int affectedRecords = service.updateById(id, addressSearchCriteria);
        if (affectedRecords == 0) {
            return Response.accepted().build();
        }
        return Response.ok(affectedRecords).build();
    }
}
