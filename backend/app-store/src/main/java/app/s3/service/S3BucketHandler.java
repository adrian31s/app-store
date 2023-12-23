package app.s3.service;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@ApplicationScoped
@Slf4j
public class S3BucketHandler {
    @ConfigProperty(name = "aws.bucket.name")
    String bucketName;

    private final AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
            .withRegion(Regions.US_EAST_1)
            .withCredentials(new DefaultAWSCredentialsProviderChain())
            .build();


    public String putObject(String bytes, String fileName) {
        try {
            if (bytes == null) return "not-found";
            File fileToUpload = uploadToTemp(bytes, fileName);
            String key = "items/" + fileName + ".png";
            s3Client.putObject(bucketName, key, fileToUpload);
            log.info("SUCCESSFULLY PUTTED");
            return key;
        } catch (Exception ex) {
            log.info("PUT FAILED");
            return "not-found";
        }
    }

    private File uploadToTemp(String bytes, String fileName) throws IOException {
        File tempFile = File.createTempFile(fileName, null);
        Files.write(tempFile.toPath(), bytes.getBytes());
        return tempFile;
    }
}
