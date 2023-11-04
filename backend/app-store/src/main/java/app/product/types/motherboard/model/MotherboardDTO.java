package app.product.types.motherboard.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MotherboardDTO {
    private String motherboardStandard;
    private String processorSocket;
    private String memoryType;
    private int maxMemory;
}
