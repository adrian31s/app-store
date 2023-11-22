package app.security.authorization;


import antlr.Token;
import app.person.model.Person;
import app.person.model.PersonSearchCriteria;
import app.person.service.PersonService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Slf4j
public class Authorization {
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Getter
    public static class AuthRequest {
        private String username;
        private String password;
    }

    //for login endpoint
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Getter
    public static class AuthResponse {
        private String token;
    }

    //for resource object example
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Getter
    public static class Message {

        private String content;
    }

    @Path("/auth")
    public static class Login{
        @Inject
        PersonService personService;

        @ConfigProperty(name = "com.ard333.quarkusjwt.jwt.duration") public Long duration;
        @ConfigProperty(name = "mp.jwt.verify.issuer") public String issuer;

        @PermitAll
        @POST
        @Path("/login")
        @Produces(MediaType.APPLICATION_JSON)
        public Response login(@RequestBody  AuthRequest authRequest) {
            Person person = personService.findByUsernameAndPassword(authRequest.username, authRequest.password);

            if (person != null) {
                try {
                    return Response.ok(new AuthResponse(TokenUtils.generateToken(person.getUsername(), person.getRole(), duration, issuer))).build();
                } catch (Exception e) {
                    return Response.status(Response.Status.UNAUTHORIZED).build();
                }
            } else {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        }

        @RolesAllowed("USER")
        @GET
        @Path("/test")
        @Produces(MediaType.APPLICATION_JSON)
        public Response logi1n(@HeaderParam("Authorization") String jwtCookie) throws Exception {
            return Response.ok(PersonSearchCriteria.builder().name("asd").build()).build();
        }
    }
}
