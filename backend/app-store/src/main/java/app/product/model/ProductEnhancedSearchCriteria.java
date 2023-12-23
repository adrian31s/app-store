package app.product.model;


import lombok.With;

@With
public record ProductEnhancedSearchCriteria(
        String bid,
        String productCategoryProperty,
        String name,
        String producer,
        String guarantee,
        String model,
        String price,
        String quantity,
        String rate,
        String power,
        String standard,
        String coolingType,
        String noise,
        String width,
        String height,
        String depth,
        String type,
        String maxRotationSpeed,
        String maxVolume,
        String supplyVoltage,
        String coolerType,
        String latencyCycle,
        String memoryType,
        String frequency,
        String memory,
        String memoryChipset,
        String connectorType,
        String memoryClocking,
        String memoryInterface,
        String motherboardStandard,
        String processorSocket,
        String maxMemory,
        String length

) {
    public ProductEnhancedSearchCriteria() { //test purpose
        this(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
}
