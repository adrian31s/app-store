package app.product.types.processor.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessorDTO {
    private String processorType;
    private String socketType;
    private int numberOfCores;
    private int numberOfThreads;
    private int l3Capacity;
}
