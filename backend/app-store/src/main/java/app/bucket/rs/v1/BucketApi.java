package app.bucket.rs.v1;

import app.bucket.model.Bucket;
import app.bucket.model.BucketDTO;
import app.bucket.service.BucketMapper;
import app.bucket.service.BucketMapperImpl;
import app.bucket.service.BucketService;
import app.security.authorization.TokenUtils;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("bucket")
public class BucketApi {
    @Inject
    BucketService bucketService;

    private final BucketMapper bucketMapper = new BucketMapperImpl();

    @RolesAllowed(value = "USER")
    @GET
    @Path("/getActiveBucketAssignedToPerson")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getActiveBucketAssignedToPerson", description = "get active bucket which can be modified assigned to person")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = BucketDTO.class)
            )
    )
    public Response getActiveBucketAssignedToPersonById(@HeaderParam("Authorization") String token) {
        Bucket activeBucket = bucketService.getActiveBucketByPersonId(TokenUtils.encodeToken(token));
        return Response.ok(bucketMapper.mapToDTO(activeBucket)).build();
    }

}
