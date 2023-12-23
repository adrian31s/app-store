package app.sharedServices;

import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.RequestScoped;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@RequestScoped
@Slf4j
public class ReadFromFileService {

    public String loadFileFromResources(String filename) {
        try (InputStream inputStream = this.getClass()
                .getClassLoader()
                .getResourceAsStream("files/" + filename);
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            return reader.lines()
                    .collect(Collectors.joining(System.lineSeparator()));
        } catch (Exception ex) {
            throw new RuntimeException("file not loaded");
        }
    }
}
