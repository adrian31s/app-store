package app.product.types.charger.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChargerDTO {
    private String power;
    private String standard;
    private String coolingType;
    private int noise;
    private int width;
    private int height;
    private int depth;

}
