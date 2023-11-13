package app.bucket.rs.v1;

import app.bucket.model.Bucket;
import app.bucket.service.BucketMapper;
import app.bucket.service.BucketMapperImpl;
import app.bucket.service.BucketService;

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
    @Path("/getActiveBucketById/id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getActiveBucketAssignedToPerson(@PathParam("id") Long personId){
        Bucket activeBucket = bucketService.getActiveBucketByPersonId(personId);
        return Response.ok(bucketMapper.mapToDTO(activeBucket)).build();
    }

}
