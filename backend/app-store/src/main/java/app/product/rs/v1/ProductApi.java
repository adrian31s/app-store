package app.product.rs.v1;

import app.product.model.Product;
import app.product.model.ProductDTO;
import app.product.model.ProductEnhancedSearchCriteria;
import app.product.model.ProductSearchCriteria;
import app.product.service.ProductService;
import app.product.service.mapper.ProductMapper;
import app.product.service.mapper.ProductMapperImpl;
import lombok.extern.slf4j.Slf4j;
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

@Path("product")
@Slf4j
public class ProductApi {
    @Inject
    ProductService productService;

    private final ProductMapper productMapper = new ProductMapperImpl();

    @GET
    @Path("/getById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getProductById", description = "get product by id")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = Product.class)
            )
    )
    public Response getProductById(@PathParam("id") Long id) {
        Product product = productService.getProductById(id);
        return Response.ok(productMapper.mapToDTO(product)).build();
    }

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getProducts", description = "get all products")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = ProductDTO.class)
            )
    )
    public Response getProducts() {
        List<Product> products = productService.getAllProducts();
        return Response.ok(productMapper.mapToListDTO(products)).build();
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "createProduct", description = "create product")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = ProductDTO.class)
            )
    )
    public Response createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return Response.accepted(productMapper.mapToDTO(createdProduct)).build();
    }

    @PUT
    @Path("/updateBaseById/id/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "updateProductBaseById", description = "update product base attributes by id")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = ProductDTO.class)
            )
    )
    public Response updateProductBaseById(@PathParam("id") Long id, @RequestBody ProductSearchCriteria searchCriteria) {
        return Response.accepted(productService.updateProductById(id, searchCriteria)).build();
    }

    @PUT
    @Path("/updateProductWithDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(operationId = "updateProductWithDetailsById", description = "update product with details by id")
    @APIResponse(
            responseCode = "202",
            description = "ACCEPTED",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.OBJECT, implementation = ProductDTO.class)
            )
    )
    public Response updateProductWithDetailsById(@RequestBody Product product) {
        Product updatedProduct = productService.updateProductWithDetailsById(product);
        return Response.accepted(productMapper.mapToDTO(updatedProduct)).build();
    }

    @POST
    @Path("/getBySearchCriteria")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(operationId = "getProductsBySearchCriteria", description = "get products by search criteria")
    @APIResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON,
                    schema = @Schema(type = SchemaType.ARRAY, implementation = ProductDTO.class)
            )
    )
    public Response getProductsBySearchCriteria(@RequestBody ProductEnhancedSearchCriteria searchCriteria) {
        log.info("searchCriteria:{}", searchCriteria);
        List<Product> products = productService.getProductsBySearchCriteria(searchCriteria);
        return Response.ok(productMapper.mapToListDTO(products)).build();
    }
}
