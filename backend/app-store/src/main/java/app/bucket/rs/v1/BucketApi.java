package app.bucket.rs.v1;

import app.bucket.model.Bucket;
import app.bucket.model.BucketDTO;
import app.bucket.service.BucketMapper;
import app.bucket.service.BucketMapperImpl;
import app.bucket.service.BucketService;
import app.product.model.ProductDTO;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("bucket")
public class BucketApi {
    @Inject
    BucketService bucketService;

    private final BucketMapper bucketMapper = new BucketMapperImpl();

    @GET
    @Path("/getActiveBucketAssignedToPersonById/id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getActiveBucketAssignedToPersonById", description = "get active bucket which can be modified assigned to person")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = BucketDTO.class)
            )
    )
    public Response getActiveBucketAssignedToPersonById(@PathParam("id") Long personId){
        Bucket activeBucket = bucketService.getActiveBucketByPersonId(personId);
        return Response.ok(bucketMapper.mapToDTO(activeBucket)).build();
    }

}
