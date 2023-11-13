package app.product.types.charger.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ChargerSearchCriteria {
    private String power;
    private String standard;
    private int noise;
    private String coolingType;
    private int width;
    private int height;
    private int depth;
}
