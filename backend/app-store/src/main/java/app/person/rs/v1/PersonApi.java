package app.person.rs.v1;

import app.person.model.Person;
import app.person.service.PersonMapper;
import app.person.service.PersonMapperImpl;
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

    private final PersonMapper personMapper = new PersonMapperImpl();

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        List<Person> people = service.getAll();
        return Response.ok(personMapper.mapToListDTO(people)).build();
    }

    @GET
    @Path("/getById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPersonById(@PathParam("id") Long id) {
        Person person = service.getById(id);
        return Response.ok(personMapper.mapToDTO(person)).build();
    }

    @PATCH
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateById(@RequestBody Person person) {
        int affectedRecords = service.updateById(person.getBid(), personMapper.mapToSearchCriteria(person));
        if (affectedRecords == 0) {
            return Response.accepted().build();
        }
        return Response.ok(affectedRecords).build();
    }
}
