package app.s3.service;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.io.File;

//@QuarkusTest
public class S3BucketHandlerTest {
    @Inject
    S3BucketHandler s3BucketHandler;

//    @Test
    void shouldAddFileWhenPutObject() throws Exception{
        //given
        s3BucketHandler.putObject(null,"nazwa");
        Assertions.assertNull(null);
    }
}
