package app.person.rs.v1;

import app.person.model.Person;
import app.person.model.PersonDTO;
import app.person.service.PersonMapper;
import app.person.service.PersonMapperImpl;
import app.person.service.PersonService;
import app.product.model.ProductDTO;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("person")
public class PersonApi {
    @Inject
    PersonService service;

    private final PersonMapper personMapper = new PersonMapperImpl();

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getAllPeople", description = "get all people")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = PersonDTO.class)
            )
    )
    public Response getAllPeople() {
        List<Person> people = service.getAll();
        return Response.ok(personMapper.mapToListDTO(people)).build();
    }

    @GET
    @Path("/getById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getPersonById", description = "get person by id")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = PersonDTO.class)
            )
    )
    public Response getPersonById(@PathParam("id") Long id) {
        Person person = service.getById(id);
        return Response.ok(personMapper.mapToDTO(person)).build();
    }

    @PATCH
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @Operation(operationId = "updatePersonById", description = "update person by id")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = PersonDTO.class)
            )
    )
    public Response updatePersonById(@RequestBody Person person) {
        int affectedRecords = service.updateById(person.getBid(), personMapper.mapToSearchCriteria(person));
        if (affectedRecords == 0) {
            return Response.accepted().build();
        }
        return Response.ok(affectedRecords).build();
    }
}
