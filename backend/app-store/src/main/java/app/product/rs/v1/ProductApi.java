package app.product.rs.v1;

import app.product.model.Product;
import app.product.model.ProductDTO;
import app.product.model.ProductSearchCriteria;
import app.product.service.ProductService;
import app.product.service.mapper.ProductMapper;
import app.product.service.mapper.ProductMapperImpl;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("product")
public class ProductApi {
    @Inject
    ProductService productService;

    private final ProductMapper productMapper = new ProductMapperImpl();

    @GET
    @Path("/getById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductById(@PathParam("id") Long id){
        Product product = productService.getProductById(id);
       return Response.ok(productMapper.mapToDTO(product)).build();
    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProducts(){
        List<Product> products = productService.getAllProducts();
        return Response.ok(productMapper.mapToListDTO(products)).build();
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProduct(@RequestBody Product product){
        Product createdProduct = productService.createProduct(product);
        return Response.accepted(productMapper.mapToDTO(createdProduct)).build();
    }

    @PUT
    @Path("/updateBaseById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProductBaseById(@PathParam("id") Long id, @RequestBody ProductSearchCriteria searchCriteria){
        return Response.ok(productService.updateProductById(id,searchCriteria)).build();
    }

    @PUT
    @Path("/updateProductWithDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProductById(@RequestBody Product product){
        Product updatedProduct = productService.updateProductWithDetailsById(product);
        return Response.ok(productMapper.mapToDTO(updatedProduct)).build();
    }
}
