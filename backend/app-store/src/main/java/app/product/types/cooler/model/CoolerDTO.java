package app.product.types.cooler.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoolerDTO {
    private String type;
    private int maxRotationSpeed;
    private int maxVolume;
    private int supplyVoltage;
    private String coolerType;
}
